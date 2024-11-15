"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTournament } from "../../actions/tournament/create-tournament";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../state-manager/store";

const CreateButton = () => {
  const [loading, setLoading] = useState(false);
  const tournament = useSelector((state: RootState) => state.tournamentForm);
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTournament,
    onSuccess: (res) => {
      toast.info(res.message);
      queryClient.invalidateQueries({ queryKey: ["tournament-data"] });
      router.replace(`/tournament/edit/${res.tournament._id}`);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });
  return (
    <button
      className={`bg-white px-6 py-2 rounded-lg text-black font font-semibold mt-10 active:scale-95 transition-transform disabled:scale-100 disabled:bg-gray-400`}
      onClick={() => {
        mutation.mutate(tournament);
        setLoading(true);
      }}
      disabled={loading}
    >
      {loading ? "Loading..." : "Create"}
    </button>
  );
};

export default CreateButton;