import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ViewItems from "../../views/Items/ViewItems";
import ViewCustomers from "../../views/Customers/ViewCustomers";
import "./style.css";

const Main = () => {
  const { currentNav } = useContext(AppContext);
  const [currentNavigation, setCurrentNavigation] = useState(currentNav);

  useEffect(() => {
    setCurrentNavigation(currentNav);
  }, [currentNav]);

  return (
    <article>
      {currentNavigation === "customers" ? <ViewCustomers /> : ""}
      {currentNavigation === "items" ? <ViewItems /> : ""}
      {currentNavigation === "invoices" ? <div>TO IMPLEMENT</div> : ""}
    </article>
  );
};

export default Main;
