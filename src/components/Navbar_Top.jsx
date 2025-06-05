// NavbarTop.jsx
import React from "react";
import "../assets/bootstrap/css/bootstrap.min.css";
import pictureprofile from "../assets/img/avatars/avatar1.jpeg"
import { useAuth } from "../context/AuthContext";

export const NavbarTop = ({ collapsed, setCollapsed }) => {
   const { session, loading } = useAuth();
const picture = session.user.user_metadata.picture
    return (
        <div
            className={`navbar-top ${collapsed ? "collapsed" : ""}`}>
            <div className="container-fluid bar-top">
                <button
                    className="btn btn-link d-md-none rounded-circle me-3"
                    id="sidebarToggleTop"
                    type="button" 
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <i className="fas fa-bars fa-2x" />
                </button>

                <ul className="navbar-nav flex-nowrap ms-auto user-top">
                    <div className="d-none d-sm-block topbar-divider" />
                    <li className="nav-item dropdown no-arrow">
                        <div className="nav-item dropdown no-arrow">
                            <a
                                className="dropdown-toggle nav-link"
                                aria-expanded="false"
                                data-bs-toggle="dropdown"
                                href="#"
                            >
                                <span className="d-none d-lg-inline me-2 text-gray-600 small navbar-letter">
                                    {session.user.user_metadata.full_name}
                                </span>
                                <img
                                    className="border rounded-circle img-profile"
                                    src=  {picture}
                                />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
