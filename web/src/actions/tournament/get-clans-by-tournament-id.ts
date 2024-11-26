"use server";
export async function getClansByTournamentId(tournamentId: string) {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/tournament/${tournamentId}/clans`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
