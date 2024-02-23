"use client";

import React, { useState } from "react";
import { UploadButton } from "@/libs/utils/uploadthing";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const AddAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const maxLengthBio = 120;

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => setIsOpen(false);
  return (
    <>
      <div>
        <Button type="button" onClick={handleOpenModal} className="light bw">
          Upload photo
        </Button>
        <Modal
          isOpen={isOpen}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
        >
          <h2 className="text-xl">Edit Bio</h2>
          <p>Tell other user all about you, so that others know about you.</p>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
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
        </Modal>
      </div>
    </>
  );
};

export default AddAvatar;
