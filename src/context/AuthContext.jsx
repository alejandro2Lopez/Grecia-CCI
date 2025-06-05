import { createContext, useContext, useEffect, useReducer } from 'react';
import { sb } from '../components/supabaseClient';
import { authReducer, initialState } from '../reducers/AuthReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    session: null,
    loading: true,
  });

  useEffect(() => {
    const browserStarted = sessionStorage.getItem('browser-session-started');

    const initSession = async () => {
      if (!browserStarted) {
        sessionStorage.setItem('browser-session-started', 'true');
        const { data: { session } } = await sb.auth.getSession();
        if (session) {
          await sb.auth.signOut();
          dispatch({ type: 'CLEAR_SESSION' });
        } else {
          dispatch({ type: 'CLEAR_SESSION' });
        }
      } else {
        const { data: { session } } = await sb.auth.getSession();
        dispatch({ type: 'SET_SESSION', payload: session });
      }
    };

    initSession();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      dispatch({ type: 'SET_SESSION', payload: session });
    });

    return () => subscription.unsubscribe();
  }, []);

  // 👇 mientras loading, no renderices nada
  if (state.loading) return <></>; // o <LoadingScreen /> si querés

  return (
    <AuthContext.Provider value={{ ...state, sb }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
