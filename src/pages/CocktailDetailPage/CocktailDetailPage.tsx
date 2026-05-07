import { Link, useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import type { Cocktail } from "../../api/cocktails";
import { useCocktailById } from "../../hooks/useCocktailById";
import "./CocktailDetailPage.scss";

const className = "p-CocktailDetailPage";
const ingredientKeyPrefix = "strIngredient";
const measureKeyPrefix = "strMeasure";
const hiddenMetaValues = ["Other", "Unknown"];

type Ingredient = {
  ingredient: string;
  measurement: string;
};

const getIngredients = (cocktail: Cocktail) => {
  const ingredientKeys = Object.keys(cocktail)
    .filter((key) => key.startsWith(ingredientKeyPrefix))
    .sort((firstKey, secondKey) => {
      const firstIndex = Number(firstKey.replace(ingredientKeyPrefix, ""));
      const secondIndex = Number(secondKey.replace(ingredientKeyPrefix, ""));

      return firstIndex - secondIndex;
    });

  return ingredientKeys.reduce<Ingredient[]>((ingredients, ingredientKey) => {
    const ingredientIndex = ingredientKey.replace(ingredientKeyPrefix, "");
    const ingredient = cocktail[ingredientKey]?.trim();
    const measurement =
      cocktail[`${measureKeyPrefix}${ingredientIndex}`]?.trim() ?? "";

    if (!ingredient) {
      return ingredients;
    }

    return [
      ...ingredients,
      {
        ingredient,
        measurement,
      },
    ];
  }, []);
};

const CocktailDetailPage = () => {
  const { cocktailId } = useParams();
  const location = useLocation();
  const backPath =
    (location.state as { from?: string } | null)?.from ?? "/";
  const { data: cocktail, isError, isLoading } =
    useCocktailById(cocktailId);
  const ingredients = cocktail ? getIngredients(cocktail) : [];
  const cocktailMeta = cocktail
    ? [cocktail.strCategory, cocktail.strAlcoholic, cocktail.strGlass].filter(
        (value) => value && !hiddenMetaValues.includes(value),
      )
    : [];

  return (
    <main className={className}>
      <div className={`${className}__topBar`}>
        <Link className={`${className}__backLink`} to={backPath}>
          <span aria-hidden="true">←</span>
          Back to search
        </Link>

        <div aria-live="polite" aria-atomic="true">
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {isError && (
          <p>We couldn't load this cocktail. Please go back and try again.</p>
        )}
        {!isLoading && !isError && !cocktail && <p>Cocktail not found.</p>}
      </div>

      {cocktail && (
        <article className={`${className}__content`}>
          <img
            className={`${className}__image`}
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
          />
          <div className={`${className}__details`}>
            <h1>{cocktail.strDrink}</h1>
            {cocktailMeta.length > 0 && (
              <p className={`${className}__meta`}>{cocktailMeta.join(" / ")}</p>
            )}

            <section className={`${className}__section`}>
              <h2>Ingredients</h2>
              <ul className={`${className}__ingredients`}>
                {ingredients.map(({ ingredient, measurement }) => (
                  <li
                    className={`${className}__ingredient`}
                    key={`${ingredient}-${measurement}`}
                  >
                    <span>{ingredient}</span>
                    {measurement && <span>{measurement}</span>}
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${className}__section`}>
              <h2>Instructions</h2>
              <p>{cocktail.strInstructions}</p>
            </section>
          </div>
        </article>
      )}
    </main>
  );
};

export default CocktailDetailPage;
