import React, { useEffect } from "react";
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
        padding: "1rem",
        backgroundColor: "#f8f9fc",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          border: "3px solid #4e73df", // Color de borde personalizado
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={imglogo} width={80} height={80} alt="Logo" />
        <h4 className="text-dark mt-3 mb-4 text-center">¡Bienvenido!</h4>

        <form className="w-100">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="btn btn-danger w-100"
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius:30,
            }}
          >
            <i className="fa fa-google me-2" />
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </div>

  );
};

export default Login;
