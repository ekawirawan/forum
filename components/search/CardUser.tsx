import React from "react";
import Link from "next/link";
import ProfilePhoto from "../ui/ProfilePhoto";
import type { SearchUser } from "./SearchUser";

const CardUser = ({ idUser, username, fullName }: SearchUser) => {
  return (
    <Link
      href={`/user/${username}`}
      className="flex gap-3 items-center hover:bg-slate-800/5 p-2 rounded-md"
    >
      <ProfilePhoto character={fullName} width="sm" />
      <div>
        <span className="block text-sm font-medium">{username}</span>
        <span className="block text-sm text-slate-500">{fullName}</span>
      </div>
    </Link>
  );
};

export default CardUser;
