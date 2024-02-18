"use client";

import React, { ReactNode } from "react";

type Modal = {
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  isOpen: boolean;
  children: ReactNode;
};

const Modal = ({
  handleOpenModal,
  handleCloseModal,
  isOpen,
  children,
}: Modal) => {
  return (
    <>
      {/* <!-- remove `modal-overlay` element will make modal opened without overlay --> */}
      {/* <label
        className="modal-overlay opacity-0 invisible"
        onClick={handleCloseModal}
      ></label> */}
      <label
        className={`${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-75 ease-in-out h-screen inset-0 fixed w-full z-[59] bg-black/60`}
        onClick={handleCloseModal}
      ></label>
      {/* <!-- show className here will make modal visible --> */}
      <div
        className={`modal ${
          isOpen ? "show" : ""
        } flex flex-col gap-5 min-w-[23rem]`}
      >
        <button className="absolute right-4 top-3" onClick={handleCloseModal}>
          ✕
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
