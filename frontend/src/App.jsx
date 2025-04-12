import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AuthPage from "./components/AuthPage/AuthPage";
import AddCategory from "./components/AddCategory/AddCategory";

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <>
      {location.pathname !== "/auth" && <Navbar />}
      <div className="app-content">
        <Routes>
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/auth" />}
          />

          <Route
            path="/auth"
            element={token ? <Navigate to="/" /> : <AuthPage />}
          />

          <Route path="/categories/add" element={<AddCategory />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
