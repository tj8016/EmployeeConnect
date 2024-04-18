import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import SingUp from "./pages/Signup";
import Home from "./pages/Home";

import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";

const App = () => {
  return (
    <div className="flex min-h-screen max-w-screen scroll-smooth flex-col">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoutes>
              <SingUp />
            </PublicRoutes>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
