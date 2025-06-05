import React, { useEffect} from "react";
import { sb } from "../components/supabaseClient";

import imglogo from "/assets/img/logoCCI_O.png";
import bannerlog from "/assets/img/photo-1546410531-bb4caa6b424d.jpg";

const loginWithGoogle = async () => {
  const { error } = await sb.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) console.error("Error logging in with Google:", error.message);
};

const Login = () => {
    useEffect(() => {
        document.body.classList.add('no-scroll');
    
        return () => {
          document.body.classList.remove('no-scroll');
        };
      }, []);
    
  return (
  
    <div
      className="bg-gradient-primary"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",  overflow: "hidden"
      }}
      
    > <div
     className="bg-gradient-primary"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffcc00', // Cambia al color que necesites
      zIndex: -1, // Asegúrate de que esté en el fondo,
       overflowY: 'auto'
    }}
  />
      <div className="container" >
        <div className="card shadow-lg border-0" style={{ borderRadius: "30px" }}>
          <div className="row g-0">
            {/* Imagen lateral */}
            <div className="col-lg-6 d-none d-lg-block">
              <div
                style={{
                  height: "100%",
                  backgroundImage: `url(${bannerlog})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                }}
              />
            </div>

            {/* Formulario */}
            <div className="col-lg-6 p-4 d-flex flex-column justify-content-center">
              <div className="text-center mb-4">
                <img src={imglogo} width={89} height={91} alt="Logo" />
                <h4 className="text-dark mt-3">¡Bienvenido!</h4>
              </div>

              <form className="user">
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="btn btn-danger d-block w-100 mb-3"
                >
                  <i className="fab fa-google me-2" />
                  Iniciar sesión con Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
