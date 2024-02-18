import React from "react";

const Skeleton = ({ height }: { height: number }) => {
  return (
    <div
      className="flex h-52 skeleton wave bw rounded-xl transition-all transform"
      style={{ height: `${height}rem` }}
    ></div>
  );
};

export default Skeleton;
