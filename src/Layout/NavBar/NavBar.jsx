import React from "react";
import "./NavBar.css";
import NavElement from "./NavElement";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import DescriptionIcon from "@mui/icons-material/Description";

const NavigationElements = [
  {
    to: "customers",
    icon: <PersonIcon />,
    text: "Customers",
  },
  {
    to: "items",
    icon: <StarIcon />,
    text: "Items",
  },
  {
    to: "invoices",
    icon: <DescriptionIcon />,
    text: "Invoices",
  },
];

const NavBar = () => {
  return (
    <nav>
      <div className="nav-list">
        {NavigationElements.map(({ to, icon, text }, index) => (
          <NavElement to={to} key={index} icon={icon} text={text} />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
