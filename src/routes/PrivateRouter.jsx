const PrivateRouter = ({ children }) => {
  const { session, loading, sb } = useAuth();
  const [autorizado, setAutorizado] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const validarPermiso = async () => {
      if (session) {
        const res = await getFetch(sb, 'auth-review');
        if (res?.data?.status === 'OK') {
          setAutorizado(true);
        } else {
          await sb.auth.signOut();
          setAutorizado(false);
        }
      } else {
        setAutorizado(false);
      }
    };

    validarPermiso();
  }, [session, location.pathname]);

  if (loading || autorizado === null) return <Loading />;

  return autorizado ? children : <Navigate to="/login" />;
};
