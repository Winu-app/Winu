import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("winu-token")?.value || "";
    if (!token) {
      return;
    }
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (e) {
    throw new Error(e as any);
  }
}
