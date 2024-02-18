import React from "react";
import SignUp from "@/components/signUp/SignUp";

const page = ({ searchParams }: { searchParams: { callbackUrl?: string } }) => {
  return (
    <main>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="w-72">
          <h2 className="text-xl font-medium">Create an account</h2>
          <p className="text-base text-slate-600 mt-2">
            Sign up to create an account and explore many things.
          </p>
          <SignUp callbackUrl={searchParams.callbackUrl} />
        </div>
      </div>
    </main>
  );
};

export default page;
