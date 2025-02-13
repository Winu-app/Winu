"use client";
import React, { useEffect, useState } from "react";
import ClanImage from "./clan-image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClan } from "src/actions/clan/create-clan";
import { getUserWithAuthToken } from "src/actions/user/get-user-with-auth-token";
import { getClanById } from "src/actions/clan/get-clan-by-id";

const CreateClan = () => {
  const [name, setName] = useState("");
  const [uniqueName, setUniqueName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const qc = useQueryClient();

  const { data: user } = useQuery({
    queryFn: () => getUserWithAuthToken(),
    queryKey: ["current-user"],
  });

  const { mutate, isPending, data, reset } = useMutation({
    mutationFn: createClan,
    onSuccess: async (res) => {
      toast.info(res.message);
    },
    onSettled: async () => {
      await qc.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useQuery({
    queryKey: ["my-clan"],
    queryFn: () => getClanById(data?.clan?._id),
    enabled: !!data?.clan?._id,
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className="size-full py-3 flex items-start justify-start">
      <div className="h-full w-96 flex justify-center">
        <ClanImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      </div>
      <div className="px-2 flex flex-col gap-2">
        <input
          className="text-xl bg-transparent outline-none"
          placeholder="Name"
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="bg-transparent outline-none"
          placeholder="Unique Name"
          autoFocus
          value={uniqueName}
          onChange={(e) => {
            setUniqueName(e.target.value);
          }}
        />
        <textarea
          placeholder="description..."
          className="bg-transparent outline-none border border-active rounded-lg resize-none p-2 w-96 h-28"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          className="px-4 py-2 bg-white rounded-lg text-black font-semibold active:scale-95 transition-transform mt-4 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-gray-300"
          disabled={isPending}
          onClick={() => {
            mutate({
              imageUrl,
              leader: user.user._id,
              name,
              uniqueName,
              coLeaders: [],
              description,
              members: [],
            });
          }}
        >
          {isPending ? "Loading..." : "Create Clan"}
        </button>
      </div>
    </div>
  );
};

export default CreateClan;
