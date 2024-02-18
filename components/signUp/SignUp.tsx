"use client";

import React, { useState } from "react";
import Input from "../ui/form/Input";
import Button from "../ui/Button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const SignUp = ({ callbackUrl }: { callbackUrl?: string }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const newUser = {
    fullName,
    username,
    password,
  };

  const { mutate: submitSignUp, isPending } = useMutation({
    mutationFn: async () => axios.post("/api/user", newUser),
    onSuccess: () => {
      toast.success("Sign up successfully");
      setFullName("");
      setUsername("");
      setPassword("");
      router.push(
        `/sign-in${
          callbackUrl ? "?callbackUrl=" + encodeURIComponent(callbackUrl) : ""
        }`
      );
    },
    onError: () => {
      toast.error("Something went wrong, please try again!");
    },
  });

  return (
    <div className="flex flex-col items-center mt-5">
      <Input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Username"
        className="mt-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        className="mt-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        onClick={() => submitSignUp()}
        className={`solid success w-full mt-5 ${isPending ? "is-loading" : ""}`}
      >
        Sign Up
      </Button>
      <Link
        href={`/sign-in${
          callbackUrl ? "?callbackUrl=" + encodeURIComponent(callbackUrl) : ""
        }`}
        className="border-t mt-4 p-2"
      >
        Have an account? <span className="text-primary ml-1">Sign in</span>
      </Link>
    </div>
  );
};

export default SignUp;
