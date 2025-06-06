import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppRouter from "./AppRouter";
import Login from "../pages/login";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

const ManagementRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          }
        />
     

        <Route
          path="*"
          element={
            <PrivateRouter>
              <AppRouter />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
};

export default ManagementRouter;
