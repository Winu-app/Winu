"use server";

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const domain = process.env.DOMAIN;
    const res = await fetch(`${domain}/api/sign-in`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then(async (res) => await res.json());
    return res;
  } catch (e) {
    return { message: e };
  }
}
