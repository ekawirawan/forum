"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "../ui/Button";
import { Pencil } from "lucide-react";
import Modal from "../ui/Modal";
import Textarea from "../ui/form/Textarea";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EditPost = {
  idPost: string;
  content: string;
};

const EditPost = ({ idPost, content }: EditPost) => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const maxLengthPost = 250;

  useEffect(() => {
    setPost(content);
  }, [content]);

  const handleOpenModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = post.length;
        textareaRef.current.focus();
      }
    }, 500);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setPost(content);
  };

  const newPost = {
    content: post,
  };

  const queryClient = useQueryClient();
  const { mutate: submitEditPost, isPending } = useMutation({
    mutationFn: async () => axios.patch(`/api/post/${idPost}`, newPost),
    onSuccess: () => {
      toast.success("Post edited succesfully!");
      setPost("");
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ["myPost"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again!");
    },
  });

  return (
    <>
      <Button
        type="button"
        className="sm flex items-center justify-start gap-2 w-full"
        onClick={handleOpenModal}
      >
        <Pencil opacity={0.7} />
        <span className="text-slate-600 text-sm block">edit</span>
      </Button>
      <Modal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      >
        <h2 className="text-xl">Edit a post</h2>
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
              onClick={() => submitEditPost()}
              disabled={isPending || post.length < 1}
              className={`${isPending ? "is-loading" : ""} solid success`}
            >
              Edit Post
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditPost;
