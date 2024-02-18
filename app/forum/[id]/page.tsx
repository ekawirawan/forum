import React from "react";
import DetailPost from "@/components/post/DetailPost";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="lg:ml-80">
      <div className="container p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-7">Detail Post</h2>
        <div>
          <DetailPost idPost={params.id} />
        </div>
      </div>
    </main>
  );
};

export default page;
