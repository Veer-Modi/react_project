import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./SearchMeal.css";

const SearchMeal = () => {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.meals) {
          setMeal(result.meals[0]);
        } else {
          setError("Meal not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching meal details.");
        setLoading(false);
      });
  }, [idMeal]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleImageClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="meal-details">
      <Link to="/meal" className="back-btn">
        ← Back
      </Link>
      <div className="meal-profile">
        {showVideo ? (
          <div className="video-container">
            <iframe
              src={meal.strYoutube.replace("watch?v=", "embed/")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width="300"
            onClick={handleImageClick}
            className="clickable-img"
          />
        )}
        <div className="meal-det">
          <h1>{meal.strMeal}</h1>
          <h3>Category: {meal.strCategory}</h3>
          <h3>Cuisine: {meal.strArea}</h3>
        </div>
      </div>
      <div className="meal-int">
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((key, index) => (
                <li key={index}>
                  {meal[key]} - {meal[`strMeasure${key.slice(13)}`]}
                </li>
              ))}
          </ul>
        </div>
        <div className="instruction">
          <h3>Instructions:</h3>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchMeal;
