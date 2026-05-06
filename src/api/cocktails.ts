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

type RandomCocktailResponse = {
  drinks: Cocktail[];
};

type CocktailByIdResponse = {
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

export const getRandomCocktail = async () => {
  try {
    const response =
      await axiosInstance.get<RandomCocktailResponse>("/random.php");

    return response.data.drinks[0];
  } catch (error) {
    console.error("Error getting random cocktail:", error);
    throw error;
  }
};

export const getThreeRandomCocktails = async () => {
  return Promise.all([
    getRandomCocktail(),
    getRandomCocktail(),
    getRandomCocktail(),
  ]);
};

export const getCocktailById = async (id: string) => {
  try {
    const response = await axiosInstance.get<CocktailByIdResponse>(
      "/lookup.php",
      {
        params: {
          i: id,
        },
      },
    );

    return response.data.drinks?.[0] ?? null;
  } catch (error) {
    console.error("Error getting cocktail by id:", error);
    throw error;
  }
};
