"use server";

export async function getTournamentById(tournamentId: string) {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/tournament/${tournamentId}`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
