"use server";

export async function logout() {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/logout`, {
      method: "POST",
    }).then(async (res) => await res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
