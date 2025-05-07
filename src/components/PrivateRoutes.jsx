import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoutes = () => {
    const auth = useAuth();
    return (
        auth.auth == true ? <Outlet /> : <Navigate to='/log-in' />
    )
}

export default PrivateRoutes;