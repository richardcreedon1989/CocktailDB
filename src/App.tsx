import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CocktailDetailPage from "./pages/CocktailDetailPage/CocktailDetailPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cocktails/:cocktailId" element={<CocktailDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
