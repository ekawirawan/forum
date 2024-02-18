"use client";

import React, { useState } from "react";
import ProfilePhoto from "../ui/ProfilePhoto";
import Button from "../ui/Button";
import { Send } from "lucide-react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Textarea from "../ui/form/Textarea";

const MakeComment = ({ idPost }: { idPost: string | undefined }) => {
  const [comment, setComment] = useState("");
  const { data } = useSession();

  const newComment = {
    content: comment,
    postId: idPost,
    authorId: data?.user.idUser,
  };

  const queryClient = useQueryClient();
  const { mutate: submitComment, isPending } = useMutation({
    mutationFn: async () => axios.post("/api/post/comment", newComment),
    onSuccess: () => {
      toast.success("Comment added succesfully!");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["userDetailPost"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again!");
    },
  });

  return (
    <div className="mt-5 flex items-start gap-3">
      <ProfilePhoto character={data?.user.fullName} />
      <div className="flex-1 flex items-start gap-3">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={250}
          placeholder="Reply Max(250)"
        />
        <Button
          type="button"
          onClick={() => submitComment()}
          disabled={isPending || comment.length < 1}
          className={`solid success sm ${isPending ? "is-loading" : ""}`}
        >
          <Send width={21} />
        </Button>
      </div>
    </div>
  );
};

export default MakeComment;
