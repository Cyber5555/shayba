import { Routes, Route } from "react-router-dom";
import React from "react";
import { Profile } from "./profile/profile";
import { ProfileBar } from "./profileBar/profileBar";
import "./profileBar/profileBar.css";
import { HistoryPage } from "./historyPage/historyPage";
import { ChangePassword } from "./changePassword/changePassword";

export const ProfileRouter = () => {
  return (
    <div className={"profile_container"}>
      <ProfileBar />
      <Routes>
        <Route exact path="profile" element={<Profile />} />
        <Route
          exact
          path="change_password"
          element={<ChangePassword />}
        />
        <Route exact path="history" element={<HistoryPage />} />
      </Routes>
    </div>
  );
};
