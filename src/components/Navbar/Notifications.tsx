import { useEffect, useRef, useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Notifications.css";

export type InterestNotification = {
  id: string;
  profileId: string;
  name: string;
  incoming: boolean;
  status: "pending" | "approved" | "rejected";
};

type Props = {
  notifications: InterestNotification[];
  onRespond: (id: string, status: "approved" | "rejected") => Promise<void>;
};

export default function Notifications({ notifications, onRespond }: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pending = notifications.filter((item) => item.incoming && item.status === "pending").length;

  useEffect(() => {
    if (!open) return;
    const outside = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const respond = async (id: string, status: "approved" | "rejected") => {
    setBusy(id);
    setError("");
    try { await onRespond(id, status); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Could not update this request. Please try again."); }
    finally { setBusy(null); }
  };

  return (
    <div className="notification-picker" ref={root} data-no-translate="true">
      <button type="button" ref={trigger} className="notification-bell"
        aria-label={`Notifications${pending ? `, ${pending} pending requests` : ""}`}
        aria-expanded={open} aria-controls="notification-panel" onClick={() => setOpen(!open)}>
        <FaBell aria-hidden="true" />
        {pending > 0 && <span className="notification-count">{pending}</span>}
      </button>
      {open && (
        <section id="notification-panel" className="notification-panel" aria-label="Notifications">
          <div className="notification-heading"><h2>Notifications</h2>
            <button type="button" aria-label="Close notifications" onClick={() => { setOpen(false); trigger.current?.focus(); }}><FaTimes /></button>
          </div>
          {error && <p role="alert" className="notification-error">{error}</p>}
          {notifications.length === 0 ? <p className="notification-empty">No requests yet. You’ll see favourites and approval updates here.</p> : (
            <ul className="notification-list">
              {notifications.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong>
                  <p>{item.incoming
                    ? item.status === "pending" ? "Added you to favourites and requested your full profile." : `You ${item.status} this profile request.`
                    : item.status === "pending" ? "Your request is awaiting approval." : item.status === "approved" ? "Approved your request. You can now view their full profile." : "Declined your request. Their full profile remains private."}</p>
                  {item.incoming && item.status === "pending" ? (
                    <><small>Accepting shares your full profile with this person.</small>
                      <div className="notification-actions">
                        <button type="button" disabled={busy !== null} onClick={() => respond(item.id, "approved")}>Accept</button>
                        <button type="button" disabled={busy !== null} onClick={() => respond(item.id, "rejected")}>Reject</button>
                      </div></>
                  ) : <span className={`notification-status ${item.status}`}>{item.status}</span>}
                  {!item.incoming && item.status === "approved" && <Link to={`/profile/${item.profileId}`} onClick={() => setOpen(false)}>View full profile</Link>}
                  {item.incoming && <Link to={`/profile/${item.profileId}`} onClick={() => setOpen(false)}>View requester’s profile</Link>}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
