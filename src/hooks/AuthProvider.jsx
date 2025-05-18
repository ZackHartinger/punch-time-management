import React from 'react';
import { useContext, useEffect, createContext, useState } from 'react';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);

    const getCurrentUser = async () => {
        const response = await fetch(baseUrl + 'AppUsers/is-authenticated', {
            credentials: "include"
        })
        const json = await response.json();
        if (response.ok) {
            setUser(json)
            setAuth(true)
        }
        else {
            setUser(null)
            setAuth(false)
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, [])
    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}