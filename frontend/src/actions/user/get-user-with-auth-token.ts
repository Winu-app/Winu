"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserWithAuthToken() {
  try {
    const domain = process.env.DOMAIN;
    const tokenSecret = process.env.TOKEN_SECRET;
    const token = cookies().get("winu-token");
    console.log("🚀 ~ getUserWithAuthToken ~ token:", token);

    if (!token?.value) return { message: "token not found" };
    if (!tokenSecret) return { message: "token secret not found" };
    const decoded: any = jwt.verify(token.value, tokenSecret);
    console.log("🚀 ~ getUserWithAuthToken ~ decoded:", decoded);

    if (!decoded && !decoded.username) return { message: "token not found" };

    const res = await fetch(`${domain}/api/user/${decoded.username}`, {
      method: "GET",
    }).then(async (res) => await res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
