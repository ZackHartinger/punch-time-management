import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoutes = () => {
    const auth = localStorage.getItem('auth');
    console.log(auth)
    return (
        auth ? <Outlet /> : <Navigate to='/log-in' />
    )
}

export default PrivateRoutes;