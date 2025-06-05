import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faChartSimple, faUsersRectangle, faCalendar, faSignOut, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logoCci from "/assets/img/logoCCI.png"
import { LogOut } from 'lucide-react'
import { sb } from "./supabaseClient";
export const Navbar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    function handleLogout() {
        sb.auth.signOut()
            .then(() => {

                localStorage.clear();
                sessionStorage.clear();


                navigate('/login');
            })
            .catch((error) => {
                console.error('Error cerrando sesión:', error.message);
            });
    }
    return (
        <>  <nav
            className={`navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark ${collapsed ? "toggled side-bar-collapased" : "no-side-bar-collapased"
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
                </ul>
                <div className="text-center d-none d-md-inline">
                    <button
                        className="btn "
                      
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} className="icon-size" style={{color:"white"}} />

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

        </>
    );
};
