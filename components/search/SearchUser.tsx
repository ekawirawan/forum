"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CardUser from "./CardUser";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export type SearchUser = {
  idUser: string;
  username: string;
  fullName: string;
};
const SearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState<SearchUser[] | null>();
  const [notFound, setNotFound] = useState("");

  const getResultSearch = async (searchQuery: string) => {
    setResultSearch(null);
    setNotFound("");
    if (searchQuery.length < 1) {
      setResultSearch(null);
      return;
    }
    setIsLoading(true);

    const { data } = await axios.get(`/api/user/search?query=${searchQuery}`);
    if (data.message === "Users not found!") {
      setIsLoading(false);
      setResultSearch(null);
      setNotFound("Tidak ditemukan");
      return;
    }
    setResultSearch(data.users as SearchUser[]);
    setIsLoading(false);
  };

  return (
    <div className="lg:w-1/3">
      <SearchBar onChange={(e) => getResultSearch(e.target.value)} autoFocus />
      <div>
        <h3 className="mt-5 text-lg">Result</h3>
        <ul role="list" className="mt-5 divide-y divide-slate-200">
          {isLoading ? (
            <Skeleton height={3} />
          ) : (
            resultSearch?.map((result) => (
              <li key={result.idUser} className="py-2 first:pt-0 last:pb-0">
                <CardUser {...result} />
              </li>
            ))
          )}
          {notFound ? <span>{notFound}</span> : null}
        </ul>
      </div>
    </div>
  );
};

export default SearchUser;
