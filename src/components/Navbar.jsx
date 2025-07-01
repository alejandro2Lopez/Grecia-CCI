import React, { useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faChartSimple, faUsersRectangle, faCalendar, faSignOut, faArrowRight, faArrowLeft, faReceipt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import logoCci from "/assets/img/logoCCI.png"
import { authReducer } from "../reducers/AuthReducer";
import { useAuth } from "../context/AuthContext";
export const Navbar = ({ collapsed, setCollapsed }) => {
    const { sb } = useAuth()

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
    return (
        <>  <nav
            className={`navbar align-items-start sidebar clean-navbar  sidebar-dark accordion bg-gradient-primary p-0 navbar-dark ${collapsed ? "toggled side-bar-collapased" : "no-side-bar-collapased"
                }`}
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,

                zIndex: 1030
            }}
        >

            <div className="container-fluid d-flex flex-column p-0">
                <NavLink
                    className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" style={{ paddingTop: "42px", paddingBottom: "42px" }}
                    to="#"
                >
                    <div className="sidebar-brand-icon ">
                        <img src={logoCci} style={{ width: '60px' }}></img>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <span>CCI</span>
                    </div>
                </NavLink>
                <hr className="sidebar-divider my-0" />
                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/estudiantes">
                            <FontAwesomeIcon icon={faUsersRectangle} className="icon-size" />
                            <span className={`navbar-letter ${collapsed ? 'd-none' : ''}`}>Estudiantes</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profesores">
                            <FontAwesomeIcon icon={faChalkboardUser} className="icon-size" />
                            <span className={`navbar-letter ${collapsed ? 'd-none' : ''}`}>Profesores</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/gestion-de-pagos">
                            <FontAwesomeIcon icon={faCalendar} className="icon-size" />
                            <span className={`navbar-letter ${collapsed ? 'd-none' : ''}`}>Gestión de pagos</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/informe-de-pagos">
                            <FontAwesomeIcon icon={faChartSimple} className="icon-size" />
                            <span className={`navbar-letter ${collapsed ? 'd-none' : ''}`}>Informe de pagos</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/historial-de-pagos">
                            <FontAwesomeIcon icon={faReceipt} className="icon-size" />
                            <span className={`navbar-letter ${collapsed ? 'd-none' : ''}`}>Historial de pagos</span>
                        </NavLink>
                    </li>
                </ul>
                <div className="text-center d-none d-md-inline">
                    <button className="btn rounded-circle border-0"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} className="icon-size" style={{ color: "white" }} />

                    </button>
                </div>
            </div>
            <div className="mt-auto">
                <li className="nav-item">
                    <button
                        className="nav-link"
                        onClick={() => handleLogout()}
                    >
                        <FontAwesomeIcon icon={faSignOut} className="icon-size" />
                        <span className={`navbar-letter ${collapsed ? 'd-none' : ''}`}>Cerrar sesión</span>
                    </button>
                </li>
            </div>

        </nav>
            <ul className="nav bottom-nav">
                <ul className="nav bottom-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/estudiantes">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faUsersRectangle} />
                            </div>
                            <p>Estudiantes</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profesores">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faChalkboardUser} />
                            </div>
                            <p>Profesores</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/gestion-de-pagos">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faCalendar} />
                            </div>
                            <p>Pagos</p>
                        </NavLink>

                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/informe-de-pagos">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faChartSimple} />
                            </div>
                            <p>Informe</p>
                        </NavLink>
                    </li>
                    {/* Menú colapsado */}
                    <li className="nav-item dropdown">
                        <button
                            className="nav-link"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </div>
                            <p>Más</p>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end text-center">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleLogout()}
                                >
                                    <FontAwesomeIcon icon={faSignOut} className="me-2" />
                                    Cerrar sesión
                                </button>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to="/historial-de-pagos">
                                    <FontAwesomeIcon icon={faReceipt} className="me-2" />
                                    Historial de pagos
                                </NavLink>

                            </li>
                            {/* Puedes agregar más elementos aquí si hay más de 5 */}
                        </ul>
                    </li>
                </ul>

            </ul>

        </>
    );
};
