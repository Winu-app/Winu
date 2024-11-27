import { useQuery } from "@tanstack/react-query";
import { searchClan } from "src/actions/clan/search-clan";

// useSearch hook
export const useSearch = <T>(url: string, debouncedQuery: string): any => {
  return useQuery({
    queryKey: ["search", url, debouncedQuery],
    queryFn: () => searchClan<T>({ url, query: debouncedQuery }),
    enabled: !!debouncedQuery,
  });
};
