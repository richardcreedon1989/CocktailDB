import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});

export type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  [key: string]: string | null;
};

type SearchCocktailsResponse = {
  drinks: Cocktail[] | null;
};

export const searchCocktailsByName = async (name: string) => {
  try {
    const response = await axiosInstance.get<SearchCocktailsResponse>(
      "/search.php",
      {
        params: {
          s: name,
        },
      },
    );

    return response.data.drinks ?? [];
  } catch (error) {
    console.error("Error searching cocktails by name:", error);
    throw error;
  }
};
