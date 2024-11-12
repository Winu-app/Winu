"use server";

export async function getAllTournaments() {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/tournaments`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
