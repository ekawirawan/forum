"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Button from "./Button";

const SignOutNav = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      className="solid success text-sm"
    >
      Logout
    </Button>
  );
};

export default SignOutNav;
