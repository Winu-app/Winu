import { useQuery } from "@tanstack/react-query";

interface FetchSearchParams {
  url: string;
  query: string;
}

const fetchSearchResults = async <T>({
  url,
  query,
}: FetchSearchParams): Promise<T> => {
  if (!query) return [] as unknown as T;
  const domain = process.env.DOMAIN || "http://localhost:3000/";
  console.log("🚀 ~ domain:", domain);
  console.log("🚀 ~ url:", url);

  const response = await fetch(
    `${domain}/${url}?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

// useSearch hook
export const useSearch = <T>(url: string, debouncedQuery: string) => {
  return useQuery({
    queryKey: ["search", url, debouncedQuery],
    queryFn: () => fetchSearchResults<T>({ url, query: debouncedQuery }),
    enabled: !!debouncedQuery,
  });
};
