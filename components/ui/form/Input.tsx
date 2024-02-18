import React from "react";
import { cn } from "@/libs/utils";

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: ButtonProps) => {
  return <input {...props} className={cn("input", className)} />;
};

export default Input;
