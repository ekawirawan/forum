"use client";

import React, { useState } from "react";
import Card from "../ui/Card";
import Link from "next/link";
import { MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import Button from "../ui/Button";
import type { MyPost } from "./MyPost";
import { timeAgo } from "@/libs/helpers/str.helper";
import Dropdown from "../ui/dropdown/Dropdown";
import MenuDropdown from "../ui/dropdown/MenuDropdown";
import { Pencil } from "lucide-react";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const CardMyPost = ({ idPost, content, _count, createdAt }: MyPost) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Card>
      <div className="flex items-center justify-between px-3 pt-3">
        <span className="block text-slate-400 text-sm">
          {timeAgo(createdAt)}
        </span>
        <Dropdown className="light bw">
          <Button onClick={handleClickDropdown} className="button light bw sm">
            <MoreHorizontal />
          </Button>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute right-0 p-1 border rounded-xl mt-2 bg-white`}
          >
            <EditPost idPost={idPost} content={content} />
            <DeletePost idPost={idPost} />
          </div>
        </Dropdown>
      </div>
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

export default CardMyPost;
