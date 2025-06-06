import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Loading } from "../components/Component_loading";

const PublicRouter = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) return <Loading></Loading>; // o <Loading /> si tienes uno

  return !session ? children : <Navigate to="/estudiantes" replace />;
};

export default PublicRouter;
