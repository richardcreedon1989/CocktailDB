import CocktailGrid from "../components/CocktailGrid";
import type { Cocktail } from "../api/cocktails";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import { useCocktailsByName } from "../hooks/useCocktailsByName";
import { useRandomCocktails } from "../hooks/useRandomCocktails";
import { useSessionStorageState } from "../hooks/useSessionStorageState";
import "./LandingPage.scss";

const className = "p-LandingPage";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useSessionStorageState(
    "cocktail-search-term",
    "",
  );
  const [submittedSearchTerm, setSubmittedSearchTerm] = useSessionStorageState(
    "cocktail-submitted-search-term",
    "",
  );
  const [randomCocktails, setRandomCocktails] = useSessionStorageState<
    Cocktail[]
  >("cocktail-random-cocktails", []);

  const {
    data: cocktails = [],
    error,
    isError,
    isLoading,
  } = useCocktailsByName(submittedSearchTerm);

  const {
    error: randomCocktailsError,
    isError: isRandomCocktailsError,
    isPending: isRandomCocktailsPending,
    mutateAsync: getRandomCocktails,
  } = useRandomCocktails();
  const hasNoResults =
    submittedSearchTerm.trim().length > 0 &&
    !isLoading &&
    !isError &&
    cocktails.length === 0;
  const hasRandomCocktails = randomCocktails.length > 0;

  const handleGetRandomCocktails = async () => {
    const nextRandomCocktails = await getRandomCocktails();

    setRandomCocktails((currentRandomCocktails) => [
      ...currentRandomCocktails,
      ...nextRandomCocktails,
    ]);
  };

  return (
    <main className={className}>
      <section
        className={`${className}__controls`}
        aria-label="Cocktail search"
      >
        <div className={`${className}__searchControls`}>
          <SearchInput
            value={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={() => setSubmittedSearchTerm(searchTerm)}
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

      <section className={`${className}__results`} aria-label="Search results">
        <h1>Search results</h1>
        {isLoading && <LoadingSpinner label="Searching" />}
        {isError && <p>{error.message}</p>}
        {hasNoResults && <p>Try again, no cocktails match.</p>}
        <CocktailGrid cocktails={cocktails} />
      </section>

      {(hasRandomCocktails || isRandomCocktailsError) && (
        <section
          className={`${className}__results`}
          aria-label="Random cocktails"
        >
          {hasRandomCocktails && (
            <div className={`${className}__resultsHeader`}>
              <h1>Random cocktails</h1>
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
          {isRandomCocktailsError && <p>{randomCocktailsError.message}</p>}
          <CocktailGrid cocktails={randomCocktails} />
        </section>
      )}
    </main>
  );
};

export default LandingPage;
