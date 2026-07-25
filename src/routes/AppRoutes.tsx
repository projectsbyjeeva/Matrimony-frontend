import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage/LandingPage";
import SearchPopup from "../pages/Search/SearchPopup";
import ProfileDetails from "../pages/ProfileDetails/ProfileDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPopup />} />
        <Route path="/profile/:profileId" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
