import SearchInput from "../components/SearchInput";
import { useCocktailsByName } from "../hooks/useCocktailsByName";
import { useRandomCocktails } from "../hooks/useRandomCocktails";
import { useState } from "react";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const {
    data: cocktails = [],
    error,
    isError,
    isLoading,
  } = useCocktailsByName(submittedSearchTerm);
  const {
    data: randomCocktails = [],
    error: randomCocktailsError,
    isError: isRandomCocktailsError,
    isPending: isRandomCocktailsPending,
    mutate: getRandomCocktails,
  } = useRandomCocktails();
  const hasNoResults =
    submittedSearchTerm.trim().length > 0 &&
    !isLoading &&
    !isError &&
    cocktails.length === 0;

  return (
    <>
      <SearchInput
        value={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={() => setSubmittedSearchTerm(searchTerm)}
      />
      <button
        type="button"
        disabled={isRandomCocktailsPending}
        onClick={() => getRandomCocktails()}
      >
        {isRandomCocktailsPending
          ? "Generating..."
          : "Generate three random cocktails"}
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {hasNoResults && <p>Try again, no cocktails match.</p>}
      <ul>
        {cocktails.map((cocktail) => (
          <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
        ))}
      </ul>
      {isRandomCocktailsError && <p>{randomCocktailsError.message}</p>}
      <ul>
        {randomCocktails.map((cocktail) => (
          <li key={cocktail.idDrink}>
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              width="120"
              height="120"
            />
            <p>{cocktail.strDrink}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LandingPage;
