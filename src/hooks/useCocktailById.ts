import { useQuery } from "@tanstack/react-query";
import { getCocktailById } from "../api/cocktails";

export const useCocktailById = (id: string | undefined) => {
  const cocktailId = id ?? "";
  return useQuery({
    queryKey: ["cocktails", "by-id", id],
    queryFn: () => getCocktailById(cocktailId),
    enabled: cocktailId.length > 0,
  });
};
