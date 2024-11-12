"use server";

export async function getAllTournaments() {
  try {
    const res = await fetch(`http://localhost:3000/api/tournaments`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
