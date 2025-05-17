import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
// import { useLoading } from "../hooks/LoadingProvider";


const Navbar = () => {
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    const navigate = useNavigate();
    // This function collapses the navbar after a link is clicked
    const toggleCollapse = () => {
        const collapse = document.getElementById("my-navbar");

        collapse.classList.toggle('show');
    }
    const auth = useAuth();
    const userName = auth.user.fullName;
    const logOut = async () => {
        const response = await fetch(baseUrl + 'AppUsers/log-out', {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            auth.setAuth(false);
            auth.setUser(null);
            navigate("/");
        }
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{
            backgroundColor: '#393a3d'
        }}>
            <NavLink className="navbar-brand ps-2"><h2 id="logo">Punch</h2></NavLink>
            <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#my-navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="my-navbar">
                    <ul className="navbar-nav text-center ms-auto">
                        {auth.auth == true ?
                            <li>
                                <h2 className="navbar-brand nav-link">Hello, {userName}</h2>
                            </li> :
                            <></>
                        }
                        <li className="nav-item">
                            <NavLink to='/' onClick={toggleCollapse} className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/view-hours' onClick={toggleCollapse} className="nav-link" >View Hours</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/new-hours' state={{ action: 'add' }} onClick={toggleCollapse} className="nav-link" >Submit Hours</NavLink>
                        </li>

                        {
                            auth.auth == false ?
                                <>
                                    <li className="nav-item">
                                        <NavLink to='/sign-up' onClick={toggleCollapse} className="nav-link">Sign up</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/log-in' onClick={toggleCollapse} className="nav-link">Log in</NavLink>
                                    </li>
                                </> :
                                <li className="nav-item">
                                    <button onClick={() => { toggleCollapse(); logOut(); }} className="nav-link">Log Out</button>
                                </li>

                        }
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;