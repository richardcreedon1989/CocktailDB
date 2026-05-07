import { useLocation, useNavigate } from "react-router-dom";
import type { Cocktail } from "../../api/cocktails";
import "./CocktailGrid.scss";

const className = "c-CocktailGrid";

type CocktailGridProps = {
  cocktails: Cocktail[];
};

const CocktailGrid = ({ cocktails }: CocktailGridProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}`;

  if (cocktails.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {cocktails.map((cocktail, index) => (
        <li
          className={`${className}__card`}
          key={`${cocktail.idDrink}-${index}`}
        >
          <button
            className={`${className}__button`}
            type="button"
            aria-label={`View details for ${cocktail.strDrink}`}
            onClick={() =>
              navigate(`/cocktails/${cocktail.idDrink}`, {
                state: {
                  from: currentPath,
                },
              })
            }
          >
            <img
              className={`${className}__image`}
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
            />
            <h2 className={`${className}__title`}>{cocktail.strDrink}</h2>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CocktailGrid;
