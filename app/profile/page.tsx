import React from "react";
import DataProfile from "@/components/profile/DataProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  return (
    <main className="lg:ml-80">
      <div className="container p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-7">Profile</h2>
        <DataProfile idUser={session?.user.idUser} />
      </div>
    </main>
  );
};

export default page;
