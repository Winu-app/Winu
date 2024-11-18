"use server";

export async function getClanById(clanId: string) {
  try {
    if (!clanId) return { message: "Clan not found" };
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/clan/${clanId}`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
