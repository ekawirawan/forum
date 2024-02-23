"use client";

import React from "react";
import ProfilePhoto from "../ui/ProfilePhoto";
import Button from "../ui/Button";
import EditFullNameUser from "./EditFullNameUser";
import EditBioUser from "./EditBioUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import AddAvatar from "./AddAvatar";

type Profile = {
  fullName: string;
  username: string;
  bio: string;
};

const DataProfile = ({ idUser }: { idUser: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/${idUser}`);
      return data.user as Profile;
    },
  });

  if (isLoading) return <Skeleton height={15} />;
  if (isError) return <div>There was an error, try again</div>;

  return (
    <div className="space-y-8">
      <div className="flex gap-10 items-center">
        <ProfilePhoto width="lg" character={data?.fullName} />
        <div>
          <div className="flex items-center gap-3">
            <AddAvatar />
            <Button type="button" className="light bw">
              Delete
            </Button>
          </div>
          <p className="pt-2 text-sm text-slate-400">
            *Image size should be less then 500kb
          </p>
        </div>
      </div>
      <div className="lg:w-3/5 space-y-5 text-start">
        <div className="flex items-center">
          <span className="w-32 font-medium text-start align-top text-slate-700">
            Username
          </span>
          <span className="text-slate-700">{data?.username}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 align-top font-medium text-slate-700">
            Full Name
          </span>
          <span className="flex-1 flex items-center gap-4">
            <span className="block text-slate-700">{data?.fullName}</span>
            <EditFullNameUser
              idUser={idUser}
              prevFullName={data?.fullName}
              bio={data?.bio}
            />
          </span>
        </div>
        <div className="flex">
          <span className="w-32 align-top font-medium text-slate-700">Bio</span>
          <span
            className={`flex-1 flex items-center ${data?.bio ? "gap-4" : ""}`}
          >
            <span className="block text-slate-700">{data?.bio}</span>
            <EditBioUser bioProps={data?.bio} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataProfile;
