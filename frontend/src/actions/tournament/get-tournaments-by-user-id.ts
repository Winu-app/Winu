"use server";

export async function getTournamentsByUserId(userId: string) {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/tournament/user-id/${userId}`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
