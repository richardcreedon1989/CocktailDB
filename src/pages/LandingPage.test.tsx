import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Cocktail } from "../api/cocktails";
import { useCocktailsByName } from "../hooks/useCocktailsByName";
import { useRandomCocktails } from "../hooks/useRandomCocktails";
import LandingPage from "./LandingPage";

vi.mock("../hooks/useCocktailsByName", () => ({
  useCocktailsByName: vi.fn(),
}));

vi.mock("../hooks/useRandomCocktails", () => ({
  useRandomCocktails: vi.fn(),
}));

const useCocktailsByNameMock = vi.mocked(useCocktailsByName);
const useRandomCocktailsMock = vi.mocked(useRandomCocktails);

const mockUseCocktailsByName = (
  value: Partial<ReturnType<typeof useCocktailsByName>>,
) => {
  useCocktailsByNameMock.mockReturnValue(
    value as ReturnType<typeof useCocktailsByName>,
  );
};

const mockUseRandomCocktails = (
  value: Partial<ReturnType<typeof useRandomCocktails>>,
) => {
  useRandomCocktailsMock.mockReturnValue(
    value as ReturnType<typeof useRandomCocktails>,
  );
};

const renderLandingPage = (initialUrl = "/") => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialUrl]}>
        <LandingPage randomCocktails={[]} setRandomCocktails={vi.fn()} />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe("LandingPage", () => {
  beforeEach(() => {
    mockUseRandomCocktails({
      isError: false,
      isPending: false,
      mutateAsync: vi.fn(),
    });
  });

  it("shows an empty state when no cocktails match the search", () => {
    mockUseCocktailsByName({
      data: [],
      isError: false,
      isLoading: false,
    });

    renderLandingPage("/?search=unknown");

    expect(screen.getByText("0 Cocktails Found")).toBeInTheDocument();
    expect(
      screen.getByText("Try again, no cocktails match."),
    ).toBeInTheDocument();
  });

  it("shows result count and cocktail cards when cocktails match the search", () => {
    const cocktails: Cocktail[] = [
      {
        idDrink: "11007",
        strDrink: "Margarita",
        strDrinkThumb: "https://example.com/margarita.jpg",
      },
      {
        idDrink: "11000",
        strDrink: "Mojito",
        strDrinkThumb: "https://example.com/mojito.jpg",
      },
    ];

    mockUseCocktailsByName({
      data: cocktails,
      isError: false,
      isLoading: false,
    });

    renderLandingPage("/?search=m");

    expect(screen.getByText("2 Cocktails Found")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View details for Margarita" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View details for Mojito" }),
    ).toBeInTheDocument();
  });
});
