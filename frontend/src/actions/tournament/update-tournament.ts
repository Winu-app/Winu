"use server";
import { TournamentForm } from "../../state-manager/features/tournament-form";

export async function updateTournament(tournament: TournamentForm, id: string) {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/tournament/${id}`, {
      method: "POST",
      body: JSON.stringify(tournament),
    }).then(async (res) => await res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
