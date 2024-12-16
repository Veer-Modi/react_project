import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cocktail.css";

const Cocktail = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.drinks);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };
  const fetchCocktails = (url) => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.drinks) {
          setData(result.drinks);
        } else {
          setError("No cocktails found.");
          setData([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching cocktails.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();

    const url = searchTerm
      ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      : `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

    fetchCocktails(url);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    fetchCocktails(searchUrl);
  };

  const handleCategoryClick = (category) => {
    const categoryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchCocktails(categoryUrl);
  };

  return (
    <div className="cocktail">
      <h1>Cocktail API</h1>
      <form onSubmit={handleSearch}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Cocktail"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <h3>Categories</h3>
      <ul className="cocktail-cat categories">
        {categories.map((category) => (
          <li
            className="cocktail-item"
            key={category.strCategory}
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            <h2>{category.strCategory}</h2>
          </li>
        ))}
      </ul>

      <h3>Search Results</h3>
      <ul className="cocktail-cat">
        {data.map((cocktail) => (
          <li className="cocktail-item" key={cocktail.idDrink}>
            <Link to={`/cocktail/${cocktail.idDrink}`}>
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                width="100"
              />
              <h2>{cocktail.strDrink}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cocktail;
