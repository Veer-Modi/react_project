import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Meal from "./components/Meal/Meal";
import Home from "./components/Home/Home";
import Cocktail from "./components/Cocktail/Cocktial";
import SearchMeal from "./components/SearchMeal/SearchMeal";
import SearchCocktail from "./components/SearchCocktail/SearchCocktail";
import Potter from "./components/Potter/Potter";
import Banks from "./components/Banks/Banks";
// import SearchPotter from "./components/SearchPotter/SearchPotter";

function App() {
  return (
    <div className="body">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/meal/:idMeal" element={<SearchMeal />} />
        <Route path="/cocktail" element={<Cocktail />} />
        <Route path="/cocktail/:idDrink" element={<SearchCocktail />} />
        <Route path="/potter" element={<Potter />} />
        <Route path="/banks" element={<Banks />} />
        {/* <Route path="/potter/:lang/:category" element={<Potter />} /> */}
          {/* <Route
            path="/potter/:lang/:category/search"
            element={<SearchPotter />}
          /> */}
      </Routes>
    </div>
  );
}

export default App;
