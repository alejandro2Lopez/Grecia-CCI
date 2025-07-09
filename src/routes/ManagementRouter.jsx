import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppRouter from "./AppRouter";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { Loading } from "../components/Component_loading";
// Carga dinámica de Login
const Login = lazy(() => import("../pages/login"));

const ManagementRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loading/>}>
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
      </Suspense>
    </Router>
  );
};

export default ManagementRouter;
