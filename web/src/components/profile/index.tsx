import React from "react";
import UserDetails from "./user-details";
import Cover from "./cover";

const Profile = () => {
  return (
    <div className="w-full h-full flex px-10">
      <div className="w-full h-screen overflow-y-scroll custom-scrollbar"></div>
      <UserDetails />
      <div className="w-full h-screen overflow-y-scroll no-scrollbar"></div>
    </div>
  );
};

export default Profile;
