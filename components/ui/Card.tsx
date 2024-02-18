import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full shadow-3xl rounded-xl transition-all">
      {children}
    </div>
  );
};

export default Card;
