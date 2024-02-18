import MyPost from "@/components/myPost/MyPost";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="lg:ml-80">
      <div className="container p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-7">My Post</h2>
        <MyPost idUser={session?.user.idUser} />
      </div>
    </main>
  );
};

export default page;
