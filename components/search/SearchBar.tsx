import React from "react";
import { Search } from "lucide-react";
import Input from "../ui/form/Input";

type Search = React.InputHTMLAttributes<HTMLInputElement>;

const SearchBar = ({ ...props }: Search) => {
  return (
    <div className="relative focus:outline-2 w-full h-12 rounded-full">
      <Search
        opacity={0.7}
        className="absolute top-0 left-0 translate-x-1/2 translate-y-1/2"
      />
      <Input
        {...props}
        className="h-full px-12 absolute top-0 left-0 right-0 bottom-0"
        placeholder="Search user...."
      />
    </div>
  );
};

export default SearchBar;
