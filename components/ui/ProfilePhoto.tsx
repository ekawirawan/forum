import React from "react";
import Skeleton from "./Skeleton";

type Profile = {
  character?: string;
  width?: "sm" | "lg";
};

const ProfilePhoto = ({ character = "", width = "sm" }: Profile) => {
  return (
    <span
      className={`${
        width === "sm" ? "w-10 h-10 text-base" : "w-20 h-20 text-2xl"
      } flex bg-slate-200 items-center justify-center text-slate-400 font-semibold rounded-lg select-none`}
    >
      {character[0]?.toUpperCase()}
    </span>
  );
};

export default ProfilePhoto;
