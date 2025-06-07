import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getFetch } from "../components/Api_Connect"; // suponiendo que tenés ese método
import { Loading } from "../components/Component_loading";

const PrivateRouter = ({ children }) => {
  const { session, loading, sb } = useAuth();
  const [autorizado, setAutorizado] = useState(null);
  const location = useLocation(); // Detecta cambios de ruta

  useEffect(() => {
    const validarPermiso = async () => {
        const browserStarted = sessionStorage.getItem('browser-session-started');
      if (session && !browserStarted) {
        const res = await getFetch(sb, "auth-review");
        if (res) {
          if (res.data.status === "OK") {
            setAutorizado(true);
          } else {
            await sb.auth.signOut();
            setAutorizado(false);
          }
        } else {
          setAutorizado(false);
        }
      } else {
        setAutorizado(false);
      }
    };

    validarPermiso();
  }, [session, location.pathname]); // Se ejecuta al cambiar de ruta

  if (loading || autorizado === null) return <Loading />;

  return autorizado ? children : <Navigate to="/login" />;
};

export default PrivateRouter;