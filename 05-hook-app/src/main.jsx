import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainApp } from "./09-useContext/MainApp";
import { BrowserRouter, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/*<StrictMode>*/}
      <MainApp />
    {/*</StrictMode>,*/}
  </BrowserRouter>
);
