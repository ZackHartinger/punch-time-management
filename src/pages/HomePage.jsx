import PageTitle from "../components/PageTitle";
import WorkDayTable from "../components/WorkDayTable";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Spinner from "../components/Spinner";
import { useLoading } from "../hooks/LoadingProvider";

const HomePage = () => {
    const title = "Home Page";
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    const location = useLocation();
    const loading = useLoading();
    const auth = useAuth();
    const [top5workdays, setTop5Workdays] = useState([]);

    useEffect(() => {
        const getTopFive = async () => {
            loading.setIsLoading(true);
            try {
                const response = await fetch(baseUrl + `EmployeeWorkDays/top-5/${auth.user.id}`, {
                    credentials: "include"
                })
                const json = await response.json();
                if (response.ok) {
                    console.log(json)
                    setTop5Workdays(json);
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                loading.setIsLoading(false)
            }
        }

        getTopFive();
    }, [])

    // useEffect(() => {
    //     fetch(baseUrl + `EmployeeWorkDays/top-5/${auth.user.id}`, {
    //         credentials: "include"
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setTop5Workdays(data)
    //         })
    // }, [])

    useEffect(() => {
        if (location.state?.showToast) {
            toast.success(location.state.message, { autoClose: 2000 })
        }
    }, [location.state])

    if (loading.isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="container pt-3">
                <PageTitle title={title} />
                <ToastContainer />
                {/* The home page will display a table of the authenticated users last 5 work days and allow them to edit or delete workdays. Once hooked up the API the response will come from a get method on the server */}
                <div className="table-container">
                    {/* {loading.isLoading == true ? <Spinner /> :
                        <WorkDayTable baseUrl={baseUrl} tableData={top5workdays} />
                    } */}
                    <WorkDayTable baseUrl={baseUrl} tableData={top5workdays} />
                </div>
            </div>
        </>
    )
}

export default HomePage;