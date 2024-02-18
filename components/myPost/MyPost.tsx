"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import CardMyPost from "./CardMyPost";

export type MyPost = {
  content: string;
  idPost: string;
  createdAt: Date;
  _count: {
    comments: number;
  };
};

const MyPost = ({ idUser }: { idUser?: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myPost"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/post/user/${idUser}`);
      return data.posts as MyPost[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton height={12} />
        <Skeleton height={12} />
        <Skeleton height={12} />
        <Skeleton height={12} />
      </div>
    );
  }

  if (data) {
    if (!(data.length > 0)) {
      return (
        <div className="text-slate-500">
          You currently don&apos;t have any posts :(
        </div>
      );
    }
  }

  if (isError) return <div>There was an error, try again</div>;

  return (
    <div className="space-y-5">
      {data?.map((post) => (
        <React.Fragment key={post.idPost}>
          <CardMyPost {...post} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MyPost;
