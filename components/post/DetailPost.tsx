"use client";

import React from "react";
import CardPost from "./CardPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import type { Post } from "./Post";
import CardComment from "./CardComment";
import MakeComment from "./MakeComment";

export type Comment = {
  comments: {
    content: string;
    createdAt: Date;
    author: {
      username: string;
      fullName: string;
    };
    idComment: string;
  }[];
};

export type DetailPost = Post & Comment;

const DetailPost = ({ idPost }: { idPost: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userDetailPost"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/post/${idPost}`);
      return data.detailPost as DetailPost;
    },
  });

  if (isLoading) return <Skeleton height={12} />;
  if (isError) return <div>There was an error, try again</div>;

  return (
    <>
      <CardPost {...(data as Post)} />
      <MakeComment idPost={data?.idPost} />
      <div className="ml-13 mt-5 space-y-5">
        {data?.comments.map((comment) => (
          <React.Fragment key={comment.idComment}>
            <CardComment {...comment} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default DetailPost;
