"use client";

import React from "react";
import Card from "../ui/Card";
import Link from "next/link";
import ProfilePhoto from "../ui/ProfilePhoto";
import { MessageCircle, Share2 } from "lucide-react";
import Button from "../ui/Button";
import type { Post } from "./Post";
import { timeAgo } from "@/libs/helpers/str.helper";

const CardPost = ({ idPost, author, content, _count, createdAt }: Post) => {
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
      <div className="my-6 px-3">
        <p>{content}</p>
      </div>
      <div className="border-t">
        <div className="flex gap-3 p-3">
          <Link href={`/forum/${idPost}`} className="btn light bw sm">
            <MessageCircle opacity={0.7} />
            <span className="text-slate-600 text-sm">
              {_count.comments > 0 && _count.comments}
              <span className="hidden lg:inline">
                {_count.comments < 2 ? " comment" : " comments"}
              </span>
            </span>
          </Link>
          <Button type="button" className="flex light bw sm">
            <Share2 opacity={0.7} />
            <span className="hidden text-slate-600 text-sm lg:block">
              share
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardPost;
