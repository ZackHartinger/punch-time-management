import WorkDayDisplay from "../components/WorkDayDisplay";
import PageTitle from "../components/PageTitle";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { data } from "react-router-dom";

const ViewHoursPage = () => {
    const title = "View Hours";
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

    // // Test JSON data 
    // const workdays = [
    //     {
    //         "WorkDayId": 1,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 1",
    //         "Date": "2025-01-15",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 1",
    //         "Mileage": "52",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 1,
    //                 "Category": "General Labor",
    //                 "Description": "Moved Material"
    //             },
    //             {
    //                 "TaskId": 5,
    //                 "Category": "Irrigation",
    //                 "Description": "Set Irrigation heads"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 2,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 2",
    //         "Date": "2025-01-14",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 2",
    //         "Mileage": "54",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 2,
    //                 "Category": "General Labor",
    //                 "Description": "Demoed Landscape"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 3,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 3",
    //         "Date": "2025-01-13",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 3",
    //         "Mileage": "56",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 3,
    //                 "Category": "General Labor",
    //                 "Description": "Planted Plants"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 4,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 4",
    //         "Date": "2025-01-12",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 1",
    //         "Mileage": "58",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 4,
    //                 "Category": "Hardscape",
    //                 "Description": "Set Wall Blocks"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 5,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 5",
    //         "Date": "2025-01-11",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 2",
    //         "Mileage": "60",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 5,
    //                 "Category": "Irrigation",
    //                 "Description": "Set Irrigation heads"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 6,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 6",
    //         "Date": "2025-01-10",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 3",
    //         "Mileage": "62",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 1,
    //                 "Category": "General Labor",
    //                 "Description": "Moved Material"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 7,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 7",
    //         "Date": "2025-01-09",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 1",
    //         "Mileage": "64",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 2,
    //                 "Category": "General Labor",
    //                 "Description": "Demoed Landscape"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 8,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 8",
    //         "Date": "2025-01-08",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 2",
    //         "Mileage": "66",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 3,
    //                 "Category": "General Labor",
    //                 "Description": "Planted Plants"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 9,
    //         "EmployeeId": 1001,
    //         "FirstName": "Zack",
    //         "LastName": "Hartinger",
    //         "CustomerName": "Customer 9",
    //         "Date": "2025-01-07",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 3",
    //         "Mileage": "68",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 4,
    //                 "Category": "Hardscape",
    //                 "Description": "Set Wall Blocks"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 10,
    //         "EmployeeId": 1002,
    //         "FirstName": "Lauren",
    //         "LastName": "Peterson",
    //         "CustomerName": "Customer 10",
    //         "Date": "2025-01-06",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 1",
    //         "Mileage": "70",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 5,
    //                 "Category": "Irrigation",
    //                 "Description": "Set Irrigation heads"
    //             }
    //         ]
    //     },
    //     {
    //         "WorkDayId": 11,
    //         "EmployeeId": 1002,
    //         "FirstName": "Lauren",
    //         "LastName": "Peterson",
    //         "CustomerName": "Customer 11",
    //         "Date": "2025-01-05",
    //         "StartTime": "08:00 AM",
    //         "EndTime": "04:00 PM",
    //         "HoursWorked": "8",
    //         "LunchDuration": "30 minutes",
    //         "LunchTime": "12:00 PM",
    //         "TruckName": "Truck 2",
    //         "Mileage": "72",
    //         "WorkDayTasks": [
    //             {
    //                 "TaskId": 1,
    //                 "Category": "General Labor",
    //                 "Description": "Moved Material"
    //             }
    //         ]
    //     }
    // ]

    const today = new Date;
    const tomorrow = new Date(new Date(today).setDate(today.getDate() + 5))
    const [workdays, setWorkdays] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(0);
    const [date, setDate] = useState(today.toISOString().slice(0, 10));
    const [toDate, setToDate] = useState();

    // document.getElementById("date").value = date;

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
        fetch('https://localhost:7019/api/Users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
    }, [])



    // get workdays from server
    useEffect(() => {
        fetch('https://localhost:7019/api/EmployeeWorkDays')
            .then((res) => res.json())
            .then((data) => {
                setWorkdays(data);
            })
    }, [])

    // get workdays of specific user id
    const filterData = useCallback(() => {
        if (date == null && toDate == null) {
            fetch(`https://localhost:7019/api/EmployeeWorkDays/filter/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkdays(data);
                })
        }
        else if (toDate == null) {
            fetch(`https://localhost:7019/api/EmployeeWorkDays/filter/${userId}/${date}`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkdays(data);
                })
        }
        else {
            fetch(`https://localhost:7019/api/EmployeeWorkDays/filter/${userId}/${date}/${toDate}`)
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

    console.log(filteredWorkdays);
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
                                    <option value={user.userId}>{user.fullName}</option>
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
                        <div className="col-3"></div>
                        <div className="col-6">
                            <button className="btn btn-submit w-100" onClick={filterData}>Filter</button>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>

            </div>
            {/* Container for the WorkDayDisplay component */}
            <div className="work-data container">
                <WorkDayDisplay filteredWorkdays={filteredWorkdays} />
            </div>
        </>

    )
}

export default ViewHoursPage;