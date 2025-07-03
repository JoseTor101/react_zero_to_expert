import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AboutPage from "./AboutPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import { Navbar } from "./Navbar";
import { UserProvider } from "./context/UserProvider";
export const MainApp = () => {
  return (
    <>
      <UserProvider>
        <h1>Main app</h1>
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserProvider>
    </>
  );
};
