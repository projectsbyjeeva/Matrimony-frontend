import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { demoProfiles as profiles, Profile } from "../data/profileData";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import type { InterestNotification } from "../components/Navbar/Notifications";

export const REQUESTS_KEY = "valluvan.demo.requests.v1";
export const SESSION_KEY = "valluvan.demo.session.v1";
export type InterestRequest = {
  id: string;
  from: string;
  to: string;
  status: "pending" | "approved" | "rejected";
};
const isProfile = (id: string) => profiles.some((profile) => profile.id === id);
function readRequests(): InterestRequest[] {
  const raw = localStorage.getItem(REQUESTS_KEY);
  if (!raw) return [];
  const stored = JSON.parse(raw);
  if (!Array.isArray(stored)) throw new Error("Saved demo requests are invalid.");
  return stored.filter((item) => item && typeof item.id === "string" && isProfile(item.from) && isProfile(item.to)
    && item.from !== item.to && ["pending", "approved", "rejected"].includes(item.status));
}

export function requestAccess(requests: InterestRequest[], from: string, to: string): InterestRequest[] {
  if (!isProfile(from) || !isProfile(to) || from === to) throw new Error("Choose another member’s profile.");
  if (requests.some((item) => item.from === from && item.to === to)) return requests;
  return [{ id: `${from}:${to}`, from, to, status: "pending" }, ...requests];
}

export function respondToRequest(requests: InterestRequest[], actor: string, id: string, status: "approved" | "rejected"): InterestRequest[] {
  const request = requests.find((item) => item.id === id);
  if (!request || request.to !== actor) throw new Error("Only the recipient can respond to this request.");
  if (request.status !== "pending") throw new Error("This request has already been answered.");
  return requests.map((item) => item.id === id ? { ...item, status } : item);
}

export function hasProfileAccess(requests: InterestRequest[], viewer: string | undefined, owner: string) {
  return Boolean(viewer && (viewer === owner || requests.some((item) => item.from === viewer && item.to === owner && item.status === "approved")));
}

type DemoAuth = {
  user: Profile | null;
  requests: InterestRequest[];
  notifications: InterestNotification[];
  login: (id: string) => void;
  logout: () => void;
  openLogin: () => void;
  openRegister: () => void;
  favourite: (id: string) => void;
  respond: (id: string, status: "approved" | "rejected") => Promise<void>;
  canView: (id: string) => boolean;
};
const DemoAuthContext = createContext<DemoAuth | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => {
    try { return sessionStorage.getItem(SESSION_KEY); } catch { return null; }
  });
  const [requests, setRequests] = useState<InterestRequest[]>(() => {
    try { return readRequests(); } catch { return []; }
  });
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const user = profiles.find((profile) => profile.id === userId) || null;

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === REQUESTS_KEY || event.key === null) {
        try { setRequests(readRequests()); } catch { setRequests([]); }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const save = (change: (current: InterestRequest[]) => InterestRequest[]) => {
    const next = change(readRequests());
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(next));
    setRequests(next);
  };
  const login = (id: string) => {
    if (!isProfile(id)) throw new Error("Choose a demo account.");
    sessionStorage.setItem(SESSION_KEY, id);
    setUserId(id);
    setModal(null);
  };
  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUserId(null);
    setModal(null);
  };
  const notifications: InterestNotification[] = requests.filter((item) => item.to === user?.id || item.from === user?.id).map((item) => {
    const incoming = item.to === user?.id;
    const profileId = incoming ? item.from : item.to;
    return { id: item.id, profileId, name: profiles.find((profile) => profile.id === profileId)?.name || "Member", incoming, status: item.status };
  });

  return (
    <DemoAuthContext.Provider value={{
      user, requests, notifications, login, logout,
      openLogin: () => setModal("login"), openRegister: () => setModal("register"),
      favourite: (id) => {
        if (!user) { setModal("login"); return; }
        save((current) => requestAccess(current, user.id, id));
      },
      respond: async (id, status) => {
        if (!user) throw new Error("Please log in first.");
        save((current) => respondToRequest(current, user.id, id, status));
      },
      canView: (id) => hasProfileAccess(requests, user?.id, id),
    }}>
      {children}
      {modal === "login" && <Login open onClose={() => setModal(null)} onRegisterClick={() => setModal("register")} />}
      {modal === "register" && <Register open onClose={() => setModal(null)} onLoginClick={() => setModal("login")} />}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const value = useContext(DemoAuthContext);
  if (!value) throw new Error("useDemoAuth must be used inside DemoAuthProvider");
  return value;
}
