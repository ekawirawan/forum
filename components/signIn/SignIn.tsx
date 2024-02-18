"use client";

import React, { useState } from "react";
import Input from "../ui/form/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const SignIn = ({ callbackUrl }: { callbackUrl?: string }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const user = {
    username,
    password,
    redirect: false,
  };

  const submitSignIn = async () => {
    setIsPending(true);
    const signInData = await signIn("credentials", user);
    if (signInData?.error) {
      setIsPending(false);
      toast.error("Something went error");
    } else {
      setIsPending(false);
      toast.success("Sign in successfully");
      router.refresh();
      router.push(callbackUrl || "/");
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <Input
        type="text"
        placeholder="Username"
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
        onClick={() => submitSignIn()}
        type="submit"
        className={`solid success w-full mt-5 ${isPending ? "is-loading" : ""}`}
      >
        Login
      </Button>
      <Link
        href={`/sign-up${
          callbackUrl ? "?callbackUrl=" + encodeURIComponent(callbackUrl) : ""
        }`}
        className="border-t mt-4 p-2"
      >
        Don&apos;t have an account?{" "}
        <span className="text-primary ml-1">Sign up</span>
      </Link>
    </div>
  );
};

export default SignIn;
