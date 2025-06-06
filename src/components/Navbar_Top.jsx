// NavbarTop.jsx
import React, { useReducer } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { authReducer } from "../reducers/AuthReducer";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import logoCci from "/assets/img/logoCCI-1.png"
export const NavbarTop = ({ collapsed, setCollapsed }) => {
    const { session, loading, sb } = useAuth();

    const [state, dispatch] = useReducer(authReducer, {
        session: null,
        loading: true,
    });
    const navigate = useNavigate();
    function handleLogout() {
        sb.auth.signOut()
            .then(() => {

                dispatch({ type: 'CLEAR_SESSION' });
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error cerrando sesión:', error.message);
            });
    }
    const picture = session ? session.user.user_metadata.picture : null;

    return (
        <div className={`navbar-top ${collapsed ? "collapsed" : ""}`}>
            <div className="container-fluid d-flex justify-content-between align-items-center h-100 px-4">

                {/* Botón logout a la izquierda */}
                <div
                    className="btn btn-link rounded-circle me-3"
                    style={{
                        visibility: window.innerWidth >= 768 ? 'hidden' : 'visible', // oculto en md+
                     
                    }}
                >
                    <img
                        src={logoCci}
                        style={{ width: '60px', height: 'auto' }}
                        alt="Logo"
                    />
                </div>


                {/* Nombre de usuario e imagen a la derecha */}
                <ul className="navbar-nav d-flex align-items-center mb-0">
                    <li className="nav-item dropdown no-arrow">
                        <a
                            className="nav-link dropdown-toggle d-flex align-items-center"
                            data-bs-toggle="dropdown"
                            href="#"
                        >
                            <span className="d-none d-lg-inline me-2 text-gray-600 small">
                                {session ? session.user.user_metadata.full_name : "Unknown user"}
                            </span>
                            <img
                                className="img-profile rounded-circle"
                                src={picture}
                                alt="Profile"
                                style={{
                                    marginLeft: '0px',
                                    width: '40px', // ajusta según tu diseño
                                    height: '40px',
                                    objectFit: 'cover' // para evitar distorsión si no es cuadrada
                                }}
                            />

                        </a>
                    </li>
                </ul>

            </div>
        </div>


    );
};
