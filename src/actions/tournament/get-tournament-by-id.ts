"use server";

export async function getTournamentById(tournamentId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/tournament/${tournamentId}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
