import WorkDayDisplay from "../components/WorkDayDisplay";
import PageTitle from "../components/PageTitle";
import Spinner from "../components/Spinner";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { data } from "react-router-dom";
// import { useLoading } from "../hooks/LoadingProvider";

const ViewHoursPage = () => {
    const title = "View Hours";
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    // const loading = useLoading();
    const [checked, setChecked] = useState(false);
    const handleCheck = () => {
        setChecked(!checked);
        if (!checked) {
            setToDate(tomorrow.toISOString().slice(0, 10))
        }
        else {
            setToDate(null)
        }
    }

    const today = new Date;
    const todayString = today.toLocaleString('sv').split(' ')[0];

    const tomorrow = new Date(new Date(today).setDate(today.getDate() + 5))
    const [workdays, setWorkdays] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(0);
    const [date, setDate] = useState(todayString);
    const [toDate, setToDate] = useState();

    const handleSelectChange = (event) => {
        setUserId(event.target.value);
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    }

    // get users
    useEffect(() => {
        fetch(baseUrl + 'AppUsers', {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
    }, [])



    // get workdays from server
    useEffect(() => {
        // loading.setIsLoading(true)
        fetch(baseUrl + 'EmployeeWorkDays')
            .then((res) => res.json())
            .then((data) => {
                setWorkdays(data);
            })
        // .finally(() => {
        //     loading.setIsLoading(false);
        // })
    }, [])

    // get workdays of specific user id
    const filterData = useCallback(() => {
        if (date == null && toDate == null) {
            fetch(baseUrl + `EmployeeWorkDays/filter/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkdays(data);
                })
        }
        else if (toDate == null) {
            fetch(baseUrl + `EmployeeWorkDays/filter/${userId}/${date}`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkdays(data);
                })
        }
        else {
            fetch(baseUrl + `EmployeeWorkDays/filter/${userId}/${date}/${toDate}`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkdays(data);
                })
        }
    })

    // Get a list of unique EmployeeId's for filtering
    const uniqueIds = [...new Set(workdays.map(workday => workday.userId))]

    // Create array of workdays "grouped" by user Id to be used in the DOM, grouping them this way provide greater flexibility in how the data is displayed to the user
    const filteredWorkdays = []
    for (let i = 0; i < uniqueIds.length; i++) {
        filteredWorkdays.push(workdays.filter(workday => uniqueIds[i] == workday.userId))
    }

    return (
        <>
            <div className="container pt-3">
                <PageTitle title={title} />

                {/* Form group for making requests to the server to display different data sets */}
                <div>
                    <div className="filter-controls row mb-3">
                        <div className="col-12 col-md-4 mb-3">
                            <label className="form-label" htmlFor="" >Search by Name:</label>
                            {/* <input className="form-control" type="text" value={employeeName} onChange={handleNameChange} /> */}
                            <select className="form-select" onChange={handleSelectChange}>
                                <option value="0">Select an employee</option>
                                {users.map(user =>
                                    <option value={user.id} key={user.id}>{user.fullName}</option>
                                )
                                }
                            </select>
                        </div>
                        {checked == false ? (

                            <div className="col-12 col-md-8">
                                <label htmlFor="date" className="form-label">Search by date:</label>
                                <input className="form-control" type="date" value={date} onChange={handleDateChange} />
                            </div>) : (
                            <div className="col-12 col-md-8">
                                <label htmlFor="date" className="form-label">Search by date range:</label>
                                <div className="form-group row mb-2">
                                    <label className="col-form-label col-2" htmlFor="from-date">From</label>
                                    <input className="form-control col-md" name="from-date" type="date" value={date} onChange={handleDateChange} />
                                    <label className="col-form-label col-2" htmlFor="to-date">To</label>
                                    <input className="form-control col-md" name="to-date" type="date" value={toDate} onChange={handleToDateChange} />
                                </div>
                            </div>

                        )}
                    </div>
                    <div className="row mb-3">
                        <div className="col-4"></div>
                        <div className="col-8">
                            <input name="checkbox" className="me-3" type="checkbox" checked={checked} onChange={handleCheck} id="dateRangeCheck"></input>
                            <label htmlFor="dateRangeCheck">Search by date range</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4"></div>
                        <div className="col-3">
                            <button className="btn btn-submit w-100" onClick={filterData}>Filter</button>
                        </div>
                        <div className="col-5"></div>
                    </div>
                </div>

            </div>
            {/* Container for the WorkDayDisplay component */}
            <div className="work-data container">
                {/* {loading.isLoading == true ?
                    <Spinner /> :
                    <WorkDayDisplay filteredWorkdays={filteredWorkdays} />
                } */}
                <WorkDayDisplay filteredWorkdays={filteredWorkdays} />
            </div>
        </>

    )
}

export default ViewHoursPage;