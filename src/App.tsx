import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { Cocktail } from "./api/cocktails";
import CocktailDetailPage from "./pages/CocktailDetailPage/CocktailDetailPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const [randomCocktails, setRandomCocktails] = useState<Cocktail[]>([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              randomCocktails={randomCocktails}
              setRandomCocktails={setRandomCocktails}
            />
          }
        />
        <Route path="/cocktails/:cocktailId" element={<CocktailDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
