import { useQuery } from "@tanstack/react-query";
import { searchCocktailsByName } from "../api/cocktails";
import type { Cocktail } from "../api/cocktails";

export const useCocktailsByName = (name: string) => {
  const trimmedName = name.trim();

  return useQuery<Cocktail[]>({
    queryKey: ["cocktails", "by-name", trimmedName],
    queryFn: () => searchCocktailsByName(trimmedName),
    enabled: trimmedName.length > 0,
  });
};
