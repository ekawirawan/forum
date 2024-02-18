"use client";

import React from "react";
import CardPost from "./CardPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export type Post = {
  content: string;
  idPost: string;
  createdAt: Date;
  author: {
    username: string;
    fullName: string;
  };
  _count: {
    comments: number;
  };
};

const Post = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userPost"],
    queryFn: async () => {
      const { data } = await axios.get("/api/post");
      return data.posts as Post[];
    },
  });

  if (isLoading)
    return (
      <div className="space-y-5">
        <Skeleton height={12} />
        <Skeleton height={12} />
        <Skeleton height={12} />
        <Skeleton height={12} />
      </div>
    );
  if (isError) return <div>There was an error, try again</div>;

  return (
    <div className="space-y-5">
      {data?.map((post) => (
        <React.Fragment key={post.idPost}>
          <CardPost {...post} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Post;
