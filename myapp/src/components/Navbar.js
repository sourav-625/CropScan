import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    let location = useLocation();
    
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-warning fw-bold" to="/">Plant Health Analyzer</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active text-light fw-bold" : "text-secondary"}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active text-light fw-bold" : "text-secondary"}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/rentdevices" ? "active text-light fw-bold" : "text-secondary"}`} to="/rentdevices">Rent Devices</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/uploadimages" ? "active text-light fw-bold" : "text-secondary"}`} to="/uploadimages">Upload Images</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/allimages" ? "active text-light fw-bold" : "text-secondary"}`} to="/allimages">All Images</Link>
                        </li>
                    </ul>
                    <Link className="btn btn-outline-warning ms-auto px-4" to="/signin">
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
}
