import React from "react";
import Card from "../ui/Card";
import Link from "next/link";
import ProfilePhoto from "../ui/ProfilePhoto";
import { timeAgo } from "@/libs/helpers/str.helper";

type Comment = {
  content: string;
  createdAt: Date;
  author: {
    username: string;
    fullName: string;
  };
  idComment: string;
};

const CardComment = ({ content, createdAt, author, idComment }: Comment) => {
  return (
    <Card>
      <Link href="/" className="group flex items-center gap-2 px-3 pt-3 w-max">
        <ProfilePhoto character={author.fullName} />
        <div>
          <span className="block font-medium group-hover:underline group-hover:underline-offset-2">
            {author.username}
          </span>
          <span className="block text-slate-400 text-sm">
            {timeAgo(createdAt)}
          </span>
        </div>
      </Link>
      <div className="p-3">
        <p>{content}</p>
      </div>
    </Card>
  );
};

export default CardComment;
