"use client";

import React, { useState, useRef, useEffect } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Textarea from "../ui/form/Textarea";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const MakePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const maxLengthPost = 250;

  const { data } = useSession();

  const newPost = {
    content: post,
    authorId: data?.user.idUser,
  };

  const queryClient = useQueryClient();
  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: async () => axios.post("/api/post", newPost),
    onSuccess: () => {
      toast.success("Post added succesfully!");
      setPost("");
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ["userPost"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again!");
    },
  });

  //handler
  const handleOpenModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (textareaRef) textareaRef.current?.focus();
    }, 500);
  };
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <input
        type="button"
        value="What do you think..."
        className="input text-opacity-25 font-semibold"
        onClick={handleOpenModal}
        disabled={isOpen}
      />
      <Modal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      >
        <h2 className="text-xl">Make a post</h2>
        <p>
          Tell other users what you&apos;re thinking. It&apos;s important to use
          polite words!
        </p>
        <div className="flex flex-col gap-5">
          <div>
            <Textarea
              placeholder={`Type what do you think here (max ${maxLengthPost} words)`}
              value={post}
              onChange={(e) => setPost(e.target.value)}
              maxLength={maxLengthPost}
              forwardedRef={textareaRef}
            />
            <div className="mt-2 flex justify-end text-xs text-slate-600">
              {post.length} / {maxLengthPost}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="light bw"
              disabled={isPending}
            >
              Cancle
            </Button>
            <Button
              type="button"
              onClick={() => submitPost()}
              disabled={isPending || post.length < 1}
              className={`${isPending ? "is-loading" : ""} solid success`}
            >
              Make Post
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MakePost;
