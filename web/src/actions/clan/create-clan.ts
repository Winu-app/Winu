"use server";
import { Clan } from "src/types";

export async function createClan(clan: Clan) {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/clan`, {
      method: "POST",
      body: JSON.stringify(clan),
    }).then(async (res) => await res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
