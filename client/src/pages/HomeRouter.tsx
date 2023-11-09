import { Route, Routes } from "react-router-dom";

import HomeNav from "../components/HomeNav";

import ProtectedRoute from "../components/ProtectedRoute ";
import Home from "./Home";
import EditProfile from "./EditProfile";
import LandingFooter from "../components/LandingFooter";

const HomeRouter = () => {
  return (
    <div>
      <HomeNav />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <LandingFooter />
    </div>
  );
};

export default HomeRouter;
