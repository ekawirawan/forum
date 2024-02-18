import SearchUser from "@/components/search/SearchUser";
import React from "react";

const page = async () => {
  return (
    <main className="lg:ml-80">
      <div className="container p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-7">Search</h2>
        <SearchUser />
      </div>
    </main>
  );
};

export default page;
