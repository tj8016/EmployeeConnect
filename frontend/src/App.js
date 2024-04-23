import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import SingUp from "./pages/Signup";
import Home from "./pages/Home";
import Account from "./pages/Account";
import OtherProfiles from "./pages/OtherProfiles";

import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <div className="flex min-h-screen max-w-screen scroll-smooth flex-col ">
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
          path="/forgot-password"
          element={
            <PublicRoutes>
              <ForgotPassword />
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
        <Route
          path="/account"
          element={
            <PrivateRoutes>
              <Account />
            </PrivateRoutes>
          }
        />
        <Route
          path="/users/:id"
          element={
            <PrivateRoutes>
              <OtherProfiles />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
