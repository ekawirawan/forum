import React from "react";
import { cn } from "@/libs/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cn("btn", className)}>
      {props.children}
    </button>
  );
};

export default Button;
