import { useState } from "react";
import Collapsible from "../components/Collapsible";
import PageTitle from "../components/PageTitle";

const NewHoursPage = () => {
    const title = "Submit new work day"

    // get and format local time
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const todayString = today.toLocaleString('sv').split(' ')[0];

    const TaskList = [
        {
            "category": "General Labor",
            "description": "Moved Material"
        },
        {
            "category": "General Labor",
            "description": "Demoed Landscape"
        },
        {
            "category": "General Labor",
            "description": "Planted Plants"
        },
        {
            "category": "General Labor",
            "description": "Raked Garden Beds"
        },
        {
            "category": "Hardscape",
            "description": "Prepped Subbase"
        },
        {
            "category": "Hardscape",
            "description": "Set Wall Blocks"
        },
        {
            "category": "Hardscape",
            "description": "Set Pavers"
        },
        {
            "category": "Hardscape",
            "description": "Cut Pavers/Wall Blocks"
        },
        {
            "category": "Irrigation",
            "description": "Built Manifold"
        },
        {
            "category": "Irrigation",
            "description": "Plumbed Main Line or Zone Lines"
        },
        {
            "category": "Irrigation",
            "description": "Set Irrigation heads"
        },
        {
            "category": "Irrigation",
            "description": "Adjusted Irrigation"
        },
    ]

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [customerName, setCustomerName] = useState();
    const [date, setDate] = useState(todayString);
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("16:30");
    const [lunchDuration, setLunchDuration] = useState(30);
    const [lunchTime, setLunchTime] = useState("12:00");
    const [workdayTasks, setWorkdayTasks] = useState([]);

    const newWorkday = {
        firstName,
        lastName,
        customerName,
        date,
        startTime,
        endTime,
        lunchDuration,
        lunchTime,
        workdayTasks
    }

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add value to the array
            setWorkdayTasks([...workdayTasks, value]);
        } else {
            // Remove value from the array
            setWorkdayTasks(workdayTasks.filter(item => item !== value));
        }
        // console.log(workdayTasks)
    };

    return (
        <>
            <div className="container pt-3">
                <PageTitle title={title} />
                <div className="new-work-day-form form-group container">
                    <form>
                        <div className="row mb-2">
                            <div className="col-md-2">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                            </div>
                            <div className="col-md-6">
                                <input htmlFor="firstName" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
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
                                <input htmlFor="LastName" className="form-control" onChange={(e) => setLastName(e.target.value)} />
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

                        <Collapsible taskList={TaskList.filter(t => t.category === "General Labor")} updateTaskList={handleCheckboxChange}></Collapsible>
                        <Collapsible taskList={TaskList.filter(t => t.category === "Hardscape")} updateTaskList={handleCheckboxChange}></Collapsible>
                        <Collapsible taskList={TaskList.filter(t => t.category === "Irrigation")} updateTaskList={handleCheckboxChange}></Collapsible>

                        <div className="row mt-4">
                            <div className="col-2"></div>
                            <div className="col-md-4">
                                <button className="btn btn-submit" type="submit">Submit Workday</button>
                            </div>
                        </div>
                    </form>
                </div >
                <div>
                    <p>FirstName: {newWorkday.firstName}</p>
                    <p>LastName: {newWorkday.lastName}</p>
                    <p>CustomerName: {newWorkday.customerName}</p>
                    <p>Date: {newWorkday.date}</p>
                    <p>StartTime: {newWorkday.startTime}</p>
                    <p>EndTime: {newWorkday.endTime}</p>
                    <p>LunchDuration: {newWorkday.lunchDuration}</p>
                    <p>LunchTime: {newWorkday.lunchTime}</p>
                    <p>WorkdayTasks:
                        {newWorkday.workdayTasks.map(t =>
                            <>{t}</>
                        )}
                    </p>
                </div>
            </div >
        </>
    )
}

export default NewHoursPage;