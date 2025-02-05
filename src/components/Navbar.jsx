import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    // This function collapses the navbar after a link is clicked
    const toggleCollapse = () => {
        const collapse = document.getElementById("my-navbar");

        collapse.classList.toggle('show');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: '#517841', color: '#fff' }}>
            <NavLink className="navbar-brand ps-2">Punch</NavLink>
            <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#my-navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="my-navbar">
                    <ul className="navbar-nav text-center ms-auto">
                        <li className="nav-item">
                            <NavLink to='/' onClick={toggleCollapse} className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/view-hours' onClick={toggleCollapse} className="nav-link" >View Hours</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/new-hours' onClick={toggleCollapse} className="nav-link" >Submit Hours</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='#' onClick={toggleCollapse} className="nav-link">Log in</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='#' onClick={toggleCollapse} className="nav-link">Sign up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;