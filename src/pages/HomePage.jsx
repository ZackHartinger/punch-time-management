import PageTitle from "../components/PageTitle";
import WorkDayTable from "../components/WorkDayTable";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";

const HomePage = () => {
    const title = "Home Page";
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    const [top5workdays, setTop5Workdays] = useState([]);
    useEffect(() => {
        fetch(baseUrl + 'EmployeeWorkDays/top-5', {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setTop5Workdays(data)
            })
    }, [])
    const location = useLocation();

    useEffect(() => {
        if (location.state?.showToast) {
            toast.success(location.state.message, { autoClose: 2000 })
        }
    }, [location.state])

    return (
        <div className="container pt-3">
            <PageTitle title={title} />
            <ToastContainer />
            {/* The home page will display a table of the authenticated users last 5 work days and allow them to edit or delete workdays. Once hooked up the API the response will come from a get method on the server */}
            <div className="table-container">
                <WorkDayTable baseUrl={baseUrl} tableData={top5workdays} />
            </div>
        </div>
    )
}

export default HomePage;