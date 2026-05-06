import { Link, useParams } from "react-router-dom";
import type { Cocktail } from "../../api/cocktails";
import { useCocktailById } from "../../hooks/useCocktailById";
import "./CocktailDetailPage.scss";

const className = "p-CocktailDetailPage";

type Ingredient = {
  ingredient: string;
  measurement: string;
};

const getIngredients = (cocktail: Cocktail) => {
  const ingredients: Ingredient[] = [];

  for (let index = 1; index <= 15; index += 1) {
    const ingredient = cocktail[`strIngredient${index}`]?.trim();
    const measurement = cocktail[`strMeasure${index}`]?.trim() ?? "";

    if (ingredient) {
      ingredients.push({
        ingredient,
        measurement,
      });
    }
  }

  return ingredients;
};

const CocktailDetailPage = () => {
  const { cocktailId } = useParams();
  const { data: cocktail, error, isError, isLoading } =
    useCocktailById(cocktailId);
  const ingredients = cocktail ? getIngredients(cocktail) : [];

  return (
    <main className={className}>
      <Link className={`${className}__backLink`} to="/">
        Back to search
      </Link>

      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {!isLoading && !isError && !cocktail && <p>Cocktail not found.</p>}

      {cocktail && (
        <article className={`${className}__content`}>
          <img
            className={`${className}__image`}
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
          />
          <div className={`${className}__details`}>
            <h1>{cocktail.strDrink}</h1>

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
