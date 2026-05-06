import SearchInput from "../components/SearchInput";
import { useCocktailsByName } from "../hooks/useCocktailsByName";
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
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {hasNoResults && <p>Try again, no cocktails match.</p>}
      <ul>
        {cocktails.map((cocktail) => (
          <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
        ))}
      </ul>
    </>
  );
};

export default LandingPage;
