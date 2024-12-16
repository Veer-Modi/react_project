import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./SearchCocktail.css"; // Make sure you have this CSS file to style your component

const SearchCocktail = () => {
  const { idDrink } = useParams(); // Getting the cocktail id from URL params
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false); // State to toggle video display

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.drinks) {
          setCocktail(result.drinks[0]);
        } else {
          setError("Cocktail not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching cocktail details.");
        setLoading(false);
      });
  }, [idDrink]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleImageClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="cocktail-details">
      <Link to="/cocktail" className="back-btn">
        ← Back
      </Link>
      <div className="cocktail-profile">
        {showVideo ? (
          <div className="video-container">
            <iframe
              src={cocktail.strYoutube.replace("watch?v=", "embed/")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            width="300"
            onClick={handleImageClick}
            className="clickable-img"
          />
        )}
        <div className="cocktail-det">
          <h1>{cocktail.strDrink}</h1>
          <h3>Category: {cocktail.strCategory}</h3>
          <h3>Alcoholic: {cocktail.strAlcoholic}</h3>
        </div>
      </div>
      <div className="cocktail-int">
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(cocktail)
              .filter((key) => key.startsWith("strIngredient") && cocktail[key])
              .map((key, index) => (
                <li key={index}>
                  {cocktail[key]} - {cocktail[`strMeasure${key.slice(13)}`]}
                </li>
              ))}
          </ul>
        </div>
        <div className="instruction">
          <h3>Instructions:</h3>
          <p>{cocktail.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCocktail;
