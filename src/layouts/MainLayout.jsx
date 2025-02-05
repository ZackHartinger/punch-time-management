import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
// import "bootstrap/dist/js/bootstrap.min.js";

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <div className="page">
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout;