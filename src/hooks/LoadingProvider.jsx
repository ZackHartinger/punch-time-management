import React from 'react'
import { useContext, useEffect, createContext, useState } from 'react';
import { set } from 'react-hook-form';

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider;

export const useLoading = () => {
    return useContext(LoadingContext);
}