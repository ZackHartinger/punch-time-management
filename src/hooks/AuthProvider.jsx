import React from 'react';
import { useContext, useEffect, createContext, useState } from 'react';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        fetch(baseUrl + 'AppUsers/is-authenticated', {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setAuth(data)
            })
    }, [])
    console.log(auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}