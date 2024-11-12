"use client";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/state-manager/store";
import { updateTournament } from "@/actions/tournament/update-tournament";
import { useParams } from "next/navigation";

const UpdateButton = () => {
  const { id } = useParams();
  const tournament = useSelector((state: RootState) => state.tournamentForm);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { tournament: typeof tournament; id: string }) =>
      updateTournament(data.tournament, data.id),
    onSuccess: (res) => {
      toast.info(res.message);
      queryClient.invalidateQueries({ queryKey: ["tournament-data"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "An error occurred";
      toast.error(errorMessage);
    },
  });

  return (
    <button
      className="bg-white px-6 py-2 rounded-lg text-black font-semibold mt-10 active:scale-95 transition-transform disabled:scale-100 disabled:bg-gray-400"
      onClick={() => mutation.mutate({ tournament, id: id.toString() })}
      disabled={mutation.isPending}
    >
      Update
    </button>
  );
};

export default UpdateButton;
