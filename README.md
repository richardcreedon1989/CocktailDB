# CocktailDB

A React cocktail search and randomiser app built with TheCocktailDB API.

## Development Note

This application was built with support from Codex CLI, with the author reviewing the implementation in detail throughout. The work was developed iteratively, piece by piece, rather than generated in a single pass.

Changes were mostly reviewed as they were raised, with pull requests checked and merged throughout the build process. The final submission was also reviewed carefully by the author before delivery and edited where required.

## What The App Does

- Search cocktails by name.
- View matching cocktail results in a responsive card grid.
- See a clear empty state when no cocktails match the search.
- Generate 3 random cocktails.
- Use `See more` to append 3 more random cocktails without replacing the existing list.
- Clear the random cocktail list.
- Open any cocktail from search or random results to view:
  - cocktail name
  - image
  - ingredients and measurements
  - instructions

Search state is stored in the URL, for example:

```text
/?search=margarita
```

That means refreshing or navigating back from a detail page keeps the searched cocktail name and results consistent.

## A Small Surprise

There is a cocktail emoji loading spinner.

To see it properly:

1. Open browser DevTools.
2. Go to the Network tab.
3. Change throttling to `Slow 3G`.
4. Search for a cocktail or open a cocktail detail page.

The loading state should show a spinning cocktail glass.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- SCSS
- Vitest
- React Testing Library
- Testing Library User Event

## App Structure

```text
src/
  api/
    cocktails.ts
  components/
    CocktailGrid/
    LoadingSpinner/
    SearchInput/
  hooks/
    useCocktailById.ts
    useCocktailsByName.ts
    useRandomCocktails.ts
  pages/
    CocktailDetailPage/
    LandingPage/
  test/
    setup.ts
  App.tsx
  main.tsx
```

## Key Implementation Details

- `api/cocktails.ts` keeps CocktailDB API calls in one place.
- React Query handles API loading, error, and cached data states.
- React Router handles the landing page and cocktail detail page.
- Search uses URL query params instead of session storage.
- Random cocktails are kept in parent React state so they survive detail-page navigation and reset on refresh.
- Components are folder-based, with their own `.tsx`, `.scss`, and `index.ts` files.
- Cards are real buttons, so they are keyboard-focusable.
- Dynamic status areas use `aria-live` for screen reader announcements.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

Run the app locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm run test
```

Run linting:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Testing

The current test coverage focuses on the core UI behavior:

- `SearchInput`
  - disables the button when input is empty
  - submits the typed search term
- `CocktailGrid`
  - renders cocktail cards
  - navigates to detail route when a card is clicked
- `LandingPage`
  - renders empty state for no results
  - renders result count and cocktail cards for matching results

Run tests with:

```bash
npm run test
```
