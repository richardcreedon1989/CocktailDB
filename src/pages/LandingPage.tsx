import CocktailGrid from "../components/CocktailGrid";
import type { Cocktail } from "../api/cocktails";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import { useCocktailsByName } from "../hooks/useCocktailsByName";
import { useRandomCocktails } from "../hooks/useRandomCocktails";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./LandingPage.scss";

const className = "p-LandingPage";

type LandingPageProps = {
  randomCocktails: Cocktail[];
  setRandomCocktails: Dispatch<SetStateAction<Cocktail[]>>;
};

const LandingPage = ({
  randomCocktails,
  setRandomCocktails,
}: LandingPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchedCocktailName = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(searchedCocktailName);

  useEffect(() => {
    setSearchTerm(searchedCocktailName);
  }, [searchedCocktailName]);

  const {
    data: cocktails = [],
    error,
    isError,
    isLoading,
  } = useCocktailsByName(searchedCocktailName);

  const {
    error: randomCocktailsError,
    isError: isRandomCocktailsError,
    isPending: isRandomCocktailsPending,
    mutateAsync: getRandomCocktails,
  } = useRandomCocktails();

  const hasNoResults =
    searchedCocktailName.trim().length > 0 &&
    !isLoading &&
    !isError &&
    cocktails.length === 0;

  const hasSubmittedSearch = searchedCocktailName.trim().length > 0;
  const shouldShowSearchResults =
    hasSubmittedSearch || isLoading || isError || hasNoResults;
  const hasRandomCocktails = randomCocktails.length > 0;
  const searchResultsHeading = `${cocktails.length} ${
    cocktails.length === 1 ? "Cocktail" : "Cocktails"
  } Found`;

  const handleGetRandomCocktails = async () => {
    const nextRandomCocktails = await getRandomCocktails();

    setRandomCocktails((currentRandomCocktails) => [
      ...currentRandomCocktails,
      ...nextRandomCocktails,
    ]);
  };

  const handleSearch = () => {
    const nextSearchTerm = searchTerm.trim();

    if (!nextSearchTerm) {
      return;
    }

    setSearchParams({ search: nextSearchTerm });
  };

  return (
    <main className={className}>
      <header className={`${className}__header`}>
        <p className={`${className}__eyebrow`}>CocktailDB</p>
        <h1>Find your next drink</h1>
        <p className={`${className}__intro`}>
          Search cocktail recipes or generate a few random serves.
        </p>
      </header>

      <section
        className={`${className}__controls`}
        aria-label="Cocktail search"
      >
        <div className={`${className}__searchControls`}>
          <SearchInput
            value={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
        <div className={`${className}__randomControls`}>
          <button
            className={`${className}__randomButton`}
            type="button"
            disabled={isRandomCocktailsPending}
            onClick={handleGetRandomCocktails}
          >
            {isRandomCocktailsPending ? (
              <LoadingSpinner label="Generating" />
            ) : (
              "Generate random cocktails"
            )}
          </button>
        </div>
      </section>

      {shouldShowSearchResults && (
        <section
          className={`${className}__results`}
          aria-label="Search results"
        >
          <h2>{isLoading ? "Searching cocktails" : searchResultsHeading}</h2>
          {isLoading && <LoadingSpinner label="Searching" />}
          {isError && (
            <p className={`${className}__message`}>{error.message}</p>
          )}
          {hasNoResults && (
            <div className={`${className}__emptyState`}>
              <span aria-hidden="true">🍸</span>
              <p>Try again, no cocktails match.</p>
            </div>
          )}
          <CocktailGrid cocktails={cocktails} />
        </section>
      )}

      {(hasRandomCocktails || isRandomCocktailsError) && (
        <section
          className={`${className}__results`}
          aria-label="Random cocktails"
        >
          {hasRandomCocktails && (
            <div className={`${className}__resultsHeader`}>
              <h2>Random cocktails</h2>
              <div className={`${className}__resultsActions`}>
                <button
                  className={`${className}__randomButton`}
                  type="button"
                  disabled={isRandomCocktailsPending}
                  onClick={handleGetRandomCocktails}
                >
                  {isRandomCocktailsPending ? (
                    <LoadingSpinner label="Loading" />
                  ) : (
                    "See more"
                  )}
                </button>
                <button
                  className={`${className}__randomButton`}
                  type="button"
                  onClick={() => setRandomCocktails([])}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
          {isRandomCocktailsError && (
            <p className={`${className}__message`}>
              {randomCocktailsError.message}
            </p>
          )}
          <CocktailGrid cocktails={randomCocktails} />
        </section>
      )}
    </main>
  );
};

export default LandingPage;
