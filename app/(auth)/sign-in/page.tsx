import SignIn from "@/components/signIn/SignIn";
import React from "react";

const page = ({ searchParams }: { searchParams: { callbackUrl?: string } }) => {
  return (
    <main>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="w-72">
          <h2 className="text-xl font-medium">Wellcome back!</h2>
          <p className="text-base text-slate-600 mt-2">
            Enter your credentials to access your account.
          </p>
          <SignIn callbackUrl={searchParams.callbackUrl} />
        </div>
      </div>
    </main>
  );
};

export default page;
