import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// hello world
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/*
<<<<<<< HEAD
<<<<<<< HEAD
some changes
=======
some content
>>>>>>> 58058b8 (c4)
=======
some content
>>>>>>> master
*/
