"use client";

import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/form/Input";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EditFullName = {
  idUser: string;
  prevFullName?: string;
  bio?: string;
};

const EditFullNameUser = ({ idUser, prevFullName = "", bio }: EditFullName) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState(prevFullName);

  useEffect(() => {
    setFullName(prevFullName);
  }, [prevFullName]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setFullName(prevFullName);
    setIsOpen(false);
  };

  const newFullName = {
    fullName,
    bio,
  };

  const queryClient = useQueryClient();
  const { mutate: submitEditFullName, isPending } = useMutation({
    mutationFn: async () => axios.patch(`/api/user/${idUser}`, newFullName),
    onSuccess: () => {
      toast.success("User edited succesfully!");
      setFullName("");
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again!");
    },
  });

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpenModal}
        className="solid success sm"
      >
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      >
        <h2 className="text-xl">Edit Full Name</h2>
        <p>Let other users who are you, so that others can recognize you.</p>
        <form className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
              onClick={() => submitEditFullName()}
              disabled={isPending || fullName.length < 1}
              className={`${isPending ? "is-loading" : ""} solid success`}
            >
              Edit Full Name
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditFullNameUser;
