import { useQuery } from "@tanstack/react-query";
import { getCocktailById } from "../api/cocktails";

export const useCocktailById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["cocktails", "by-id", id],
    queryFn: () => getCocktailById(id ?? ""),
    enabled: Boolean(id),
  });
};
