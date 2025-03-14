import Collapsible from "../components/Collapsible";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import { useEffect } from "react";

const NewHoursPage = () => {
    const title = "Submit new work day"

    // get and format local time
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const todayString = today.toLocaleString('sv').split(' ')[0];


    const [firstName, setFirstName] = useState("Zack");
    const [lastName, setLastName] = useState("Hartinger");
    const [customerName, setCustomerName] = useState();
    const [date, setDate] = useState(todayString);
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("16:30");
    const [lunchDuration, setLunchDuration] = useState(30);
    const [lunchTime, setLunchTime] = useState("12:00");
    const [newWorkdayTasks, setNewWorkdayTasks] = useState([]); // newWorkdayTasks is holds the JSON strings of checked values in the collapsible components I gave a 
    const [userId, setUserId] = useState(1);

    // this variable takes the JSON strings from the newWorkDayTasks array and parses them back into objects so that the entire object can be stringified without adding unwanted escape characters
    const workDayTasks = newWorkdayTasks.map((task) =>
        JSON.parse(task)
    )

    const newWorkday = {
        customerName,
        date,
        startTime,
        endTime,
        lunchTime,
        lunchDuration,
        userId,
        workDayTasks
    };

    const [workTasks, setWorkTasks] = useState([]);

    // --------------- This doesn't work ----------------------
    // because useEffect is called after components are mounted, I fixed this issue by fetching the tasks within each component and passing a category prop to it. while this does work, it isn't the cleanest or most scalable way to accomplish what I want to
    // ideally collapsible components will be created automatically based on changes in the database, the current solution doesn't allow for this and would require a developer (me) to mannually add a collapsible component with a new category anytime a new task 
    // was added to the db
    // Get work tasks from db 

    // useEffect(() => {
    //     fetch('https://localhost:7019/api/WorkTasks')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setWorkTasks(data);
    //         })
    // }, [])


    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add value to the array
            setNewWorkdayTasks([...newWorkdayTasks, value]);
        } else {
            // Remove value from the array
            setNewWorkdayTasks(newWorkdayTasks.filter(item => item !== value));
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://localhost:7019/api/EmployeeWorkDays', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newWorkday)
        })
    }

    return (
        <>
            <div className="container pt-3 m-auto">
                <PageTitle title={title} />
                <div className="new-work-day-form form-group container">
                    <form onSubmit={handleSubmit}>
                        {/* First and Last name fields to be removed once authentication is added. Once authentication is added the UserId will be stroed in a hidden input for JSON construction */}
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                            </div>
                            <div className="col-md-6">
                                <input htmlFor="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="LastName" className="form-label">Last Name</label>
                            </div>
                            <div className="col-md-6">
                                <input htmlFor="LastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="CustomerName" className="form-label">Customer Name</label>
                            </div>
                            <div className="col-md-6">
                                <input htmlFor="CustomerName" className="form-control" onChange={(e) => setCustomerName(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="Date" className="form-label">Date</label>
                            </div>
                            <div className="col-md-6">
                                <input value={date} type="date" htmlFor="Date" className="form-control" onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="StartTime" className="form-label">Start Time</label>
                            </div>
                            <div className="col-md-6">
                                <input value={startTime} htmlFor="StartTime" className="form-control" type="time" onChange={(e) => setStartTime(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="EndTime" className="form-label">End Time</label>
                            </div>
                            <div className="col-md-6">
                                <input value={endTime} htmlFor="EndTime" className="form-control" type="time" onChange={(e) => setEndTime(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="LunchDuration" className="form-label">Lunch Duration</label>
                            </div>
                            <div className="col-md-6">
                                <select htmlFor="LunchDuration" className="form-select" onChange={(e) => setLunchDuration(e.target.value)}>
                                    <option value={0}>No Lunch</option>
                                    <option selected value={30}>30 minutes</option>
                                    <option value={60}>1 hour</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="LunchTime" className="form-label">Lunch time</label>
                            </div>
                            <div className="col-md-6">
                                <input value={lunchTime} htmlFor="LunchTime" className="form-control" type="time" onChange={(e) => setLunchTime(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        {/* Collapsible components are created for each category of tasks. They hold a group of checkboxes that when checked, are added to the workDayTasks array in the employeeWorkday Object.Will create an algortithm to do this automatically as changes are made to the database */}

                        <Collapsible cat={"General Labor"} updateTaskList={handleCheckboxChange}></Collapsible>
                        <Collapsible cat={"Hardscape"} updateTaskList={handleCheckboxChange}></Collapsible>
                        <Collapsible cat={"Irrigation"} updateTaskList={handleCheckboxChange}></Collapsible>

                        <div className="row mt-4">
                            <div className="col-2"></div>
                            <div className="col-md-4">
                                <button className="btn btn-submit" type="submit">Submit Workday</button>
                            </div>
                        </div>
                    </form>
                </div >
                {/* Test that data is being bound properly */}
                <div>
                    <p>CustomerName: {newWorkday.customerName}</p>
                    <p>Date: {newWorkday.date}</p>
                    <p>StartTime: {newWorkday.startTime}</p>
                    <p>EndTime: {newWorkday.endTime}</p>
                    <p>LunchTime: {newWorkday.lunchTime}</p>
                    <p>LunchDuration: {newWorkday.lunchDuration}</p>
                    <p>User Id: {newWorkday.userId}</p>
                    {/* <p>WorkdayTasks:
                        {newWorkday.workdayTasks.map(t =>
                            <>{t}</>
                        )}
                    </p> */}
                </div>
            </div >
        </>
    )
}

export default NewHoursPage;