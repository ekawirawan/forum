import MakePost from "@/components/post/MakePost";
import Post from "@/components/post/Post";
import Aside from "@/components/sections/Aside";
import Header from "@/components/sections/Header";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  return (
    <>
      <Header />
      <Aside />
      <main className="lg:ml-80">
        <div className="container p-4 max-w-7xl mx-auto">
          <MakePost />
          <section className="mt-7">
            <Post />
          </section>
        </div>
      </main>
    </>
  );
}
