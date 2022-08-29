import React from "react";
import { NavLink } from "react-router-dom";

const NavElement = ({ to, icon, text }) => {
  return (
    <NavLink
      style={{ textDecoration: "none", color: "none" }}
      to={to}
      className={({ isActive }) =>
        isActive ? "nav-list-item active" : "nav-list-item"
      }
    >
      <div className="nav-element">
        <div className="nav-align-icon">{icon}</div>
        <div className="nav-element-label">{text}</div>
      </div>
    </NavLink>
  );
};

export default NavElement;
