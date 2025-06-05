import React, { useContext } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../context/AuthContext";

const PublicRouter = ({ children }) => {
    const { session, loading } = useAuth();

    if (loading) return <h1>Cargando...</h1>;

    return !session ? children : <Navigate to="/dashboard" />;
};


export default PublicRouter;
