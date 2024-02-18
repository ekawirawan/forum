"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Textarea from "../ui/form/Textarea";

const EditBioUser = ({ bioProps = "" }: { bioProps?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState(bioProps);
  const maxLengthBio = 120;

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => setIsOpen(false);

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
        <h2 className="text-xl">Edit Bio</h2>
        <p>Tell other user all about you, so that others know about you.</p>
        <form className="flex flex-col gap-5">
          <div>
            <Textarea
              placeholder={`Bio (max ${maxLengthBio} words)`}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={maxLengthBio}
              autoFocus
            />
            <div className="mt-2 flex justify-end text-xs text-slate-600">
              {bio?.length} / {maxLengthBio}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="light bw"
            >
              Cancle
            </Button>
            <Button type="button" className="solid success">
              Edit Bio
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditBioUser;
