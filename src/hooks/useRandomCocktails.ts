import { useMutation } from "@tanstack/react-query";
import { getThreeRandomCocktails } from "../api/cocktails";

export const useRandomCocktails = () => {
  return useMutation({
    mutationFn: getThreeRandomCocktails,
  });
};
