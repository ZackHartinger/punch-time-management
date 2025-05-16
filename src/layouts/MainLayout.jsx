import { Outlet } from "react-router-dom";
import { useLoading } from "../hooks/LoadingProvider.jsx";
import Navbar from '../components/Navbar.jsx';
import Spinner from "../components/Spinner.jsx";

const MainLayout = () => {
    const loading = useLoading();

    // if (loading.isLoading) {
    //     return (
    //         <>
    //             <header>
    //                 <Navbar />
    //             </header>
    //             <div className="page">
    //                 <Spinner />
    //             </div>
    //         </>
    //     )
    // }

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