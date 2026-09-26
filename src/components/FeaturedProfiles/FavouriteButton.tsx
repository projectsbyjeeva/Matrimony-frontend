import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDemoAuth } from "../../context/DemoAuthContext";

export default function FavouriteButton({ profileId, name, className = "" }: { profileId: string; name: string; className?: string }) {
  const { user, requests, favourite } = useDemoAuth();
  const [error, setError] = useState("");
  const request = requests.find((item) => item.from === user?.id && item.to === profileId);
  if (profileId === user?.id) return null;
  const label = request ? request.status === "pending" ? "Awaiting approval" : request.status === "approved" ? "Access approved" : "Request declined" : `Favourite ${name} and request full profile`;
  return (
    <>
      <button type="button" data-no-translate="true" className={`${className} favourite-action${request ? " is-favourite" : ""}`}
        aria-label={label} title={label} aria-pressed={Boolean(request)} disabled={Boolean(request)}
        onClick={() => {
          setError("");
          try { favourite(profileId); }
          catch { setError("Could not save your request. Please enable browser storage and try again."); }
        }}>
        <FaHeart aria-hidden="true" />
        <span className="favourite-label">{request ? label : "Favourite"}</span>
      </button>
      {error && <span role="alert" className="favourite-error">{error}</span>}
    </>
  );
}
