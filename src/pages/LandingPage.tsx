import CocktailGrid from "../components/CocktailGrid";
import type { Cocktail } from "../api/cocktails";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import { useCocktailsByName } from "../hooks/useCocktailsByName";
import { useRandomCocktails } from "../hooks/useRandomCocktails";
import type { Dispatch, SetStateAction } from "react";
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

  const {
    data: cocktails = [],
    isError,
    isLoading,
  } = useCocktailsByName(searchedCocktailName);

  const {
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

  const handleSearch = (searchTerm: string) => {
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
            key={searchedCocktailName}
            initialValue={searchedCocktailName}
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
          <div aria-live="polite" aria-atomic="true">
            {isLoading && <LoadingSpinner label="Searching" />}
            {isError && (
              <p className={`${className}__message`}>
                We couldn't search cocktails right now. Please try again.
              </p>
            )}
            {hasNoResults && (
              <div className={`${className}__emptyState`}>
                <span aria-hidden="true">🍸</span>
                <p>Try again, no cocktails match.</p>
              </div>
            )}
          </div>
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
          <div aria-live="polite" aria-atomic="true">
            {isRandomCocktailsError && (
              <p className={`${className}__message`}>
                We couldn't generate random cocktails. Please try again.
              </p>
            )}
          </div>
          <CocktailGrid cocktails={randomCocktails} />
        </section>
      )}
    </main>
  );
};

export default LandingPage;
