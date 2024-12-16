import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>This is a React Project</h1>
      <div className="api-container">
        <Link to="/meal">
          {" "}
          <div className="api-item">Meal API</div>
        </Link>
        <Link to="/cocktail">
          {" "}
          <div className="api-item">Cocktail API</div>
        </Link>
        <Link to="/potter">
          {" "}
          <div className="api-item">Potter API</div>
        </Link>
        <Link to="/banks">
          {" "}
          <div className="api-item">Bank Locater</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
