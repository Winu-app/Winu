"use server";
interface FetchSearchParams {
  url: string;
  query: string;
}

export const searchClan = async <T>({
  url,
  query,
}: FetchSearchParams): Promise<T> => {
  if (!query) return [] as unknown as T;
  const domain = process.env.DOMAIN;

  console.log("search url", domain, url);

  const response = await fetch(
    `${domain}/${url.substring(1)}?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};
