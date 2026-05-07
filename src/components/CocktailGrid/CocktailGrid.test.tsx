import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { Cocktail } from "../../api/cocktails";
import CocktailGrid from "./CocktailGrid";

const cocktails: Cocktail[] = [
  {
    idDrink: "11007",
    strDrink: "Margarita",
    strDrinkThumb: "https://example.com/margarita.jpg",
  },
];

describe("CocktailGrid", () => {
  it("renders cocktail cards as buttons and navigates to the detail route", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/?search=margarita"]}>
        <Routes>
          <Route path="/" element={<CocktailGrid cocktails={cocktails} />} />
          <Route
            path="/cocktails/:cocktailId"
            element={<p>Cocktail detail page</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "View details for Margarita" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Margarita" })).toHaveAttribute(
      "src",
      "https://example.com/margarita.jpg",
    );

    await user.click(
      screen.getByRole("button", { name: "View details for Margarita" }),
    );

    expect(screen.getByText("Cocktail detail page")).toBeInTheDocument();
  });
});
