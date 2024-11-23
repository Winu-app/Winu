import { useQuery } from "@tanstack/react-query";

interface FetchSearchParams {
  url: string;
  query: string;
}

// Fetch function for API
const fetchSearchResults = async <T>({
  url,
  query,
}: FetchSearchParams): Promise<T> => {
  if (!query) return [] as unknown as T; // Return an empty array if the query is empty
  const response = await fetch(`${url}?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

// useSearch hook
export const useSearch = <T>(url: string, debouncedQuery: string) => {
  return useQuery({
    queryKey: ["search", url, debouncedQuery],
    queryFn: () => fetchSearchResults<T>({ url, query: debouncedQuery }),
    enabled: !!debouncedQuery, // Only fetch when debouncedQuery is not empty
  });
};
