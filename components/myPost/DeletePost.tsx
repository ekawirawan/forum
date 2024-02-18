"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import { Trash } from "lucide-react";
import Modal from "../ui/Modal";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DeletePost = ({ idPost }: { idPost: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const queryClient = useQueryClient();
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => axios.delete(`/api/post/${idPost}`),
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ["myPost"] });
    },
    onError: () => {
      toast.error("Semething went wrong, please try again!");
    },
  });

  return (
    <>
      <Button
        onClick={handleOpenModal}
        type="button"
        className="sm flex items-center justify-start gap-2 w-full"
      >
        <Trash opacity={0.7} />
        <span className="text-slate-600 text-sm block">delete</span>
      </Button>
      <Modal
        isOpen={isOpen}
        handleOpenModal={handleCloseModal}
        handleCloseModal={handleCloseModal}
      >
        <h2 className="text-xl">Delete a post</h2>
        <p className="text-base">Are you sure to delete this post?</p>
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            onClick={() => deletePost()}
            disabled={isPending}
            className={`${isPending ? "is-loading" : ""} light bw`}
          >
            Delete
          </Button>
          <Button
            type="button"
            onClick={handleCloseModal}
            className="solid success"
            disabled={isPending}
          >
            Cancle
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeletePost;
