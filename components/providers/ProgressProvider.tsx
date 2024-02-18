"use client";

import React, { ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#30A46C"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;
