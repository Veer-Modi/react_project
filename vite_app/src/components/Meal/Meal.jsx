import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Meal.css";

const Meal = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.categories);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const fetchMeals = (url) => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.meals) {
          setData(result.meals);
        } else {
          setError("No meals found.");
          setData([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching meals.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchMeals("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
  };

  const handleCategoryClick = (category) => {
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
  };

  return (
    <div className="meal">
      <h1>Meal API</h1>
      <form onSubmit={handleSearch}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Meal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <h3>Categories</h3>
      <ul className="meal-cat categories">
        {categories.map((category) => (
          <li
            className="meal-item"
            key={category.idCategory}
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              width="100"
            />
            <h2>{category.strCategory}</h2>
          </li>
        ))}
      </ul>

      <h3>Search Results</h3>
      <ul className="meal-cat">
        {data.map((meal) => (
          <li className="meal-item" key={meal.idMeal}>
            <Link to={`/meal/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
              <h2>{meal.strMeal}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meal;
