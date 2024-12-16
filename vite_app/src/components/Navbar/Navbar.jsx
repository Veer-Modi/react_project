import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="nav">
        <NavLink to="/" className="nav-item" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/meal" className="nav-item" activeClassName="active">
          Meal
        </NavLink>
        <NavLink to="/cocktail" className="nav-item" activeClassName="active">
          Cocktail
        </NavLink>
        <NavLink to="/potter" className="nav-item" activeClassName="active">
          Potter
        </NavLink>
        <NavLink to="/banks" className="nav-item" activeClassName="active">
          Bank
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
