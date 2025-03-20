import Collapsible from "../components/Collapsible";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

const NewHoursPage = () => {
    const location = useLocation();
    const [title, setTitle] = useState();
    useEffect(() => {
        if (location.state.action == 'add') {
            setTitle("Submit new work day")
        }
        else if (location.state.action == 'edit') {
            setTitle("Edit work day")
        }
        else {
            setTitle("error")
        }
    })

    // get and format local time
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const todayString = today.toLocaleString('sv').split(' ')[0];

    const [employeeWorkDayId, setEmployeeWorkDayId] = useState(0);
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
    );

    // if (location.state.action == 'add') {
    //     workDayTasks = newWorkdayTasks.map((task) =>
    //         JSON.parse(task)
    //     )
    // }
    // if (location.state.action == 'edit') {
    //     workDayTasks = newWorkdayTasks
    // }

    const newWorkday = {
        employeeWorkDayId,
        customerName,
        date,
        startTime,
        endTime,
        lunchTime,
        lunchDuration,
        userId,
        workDayTasks
    };

    // checks the action variable to see if the user is editing a work day in which case it will populate the form fields with its values
    useEffect(() => {
        if (location.state.action == 'edit') {

            const workDayToEdit = location.state.newWorkDay
            // console.log(workDayToEdit)
            const tasks = workDayToEdit.workDayTasks.map((task) =>
                JSON.stringify(task)
            )
            setEmployeeWorkDayId(workDayToEdit.employeeWorkDayId)
            setCustomerName(workDayToEdit.customerName)
            setDate(workDayToEdit.date)
            setStartTime(workDayToEdit.startTime)
            setEndTime(workDayToEdit.endTime)
            setLunchTime(workDayToEdit.lunchTime)
            setLunchDuration(workDayToEdit.lunchDuration)
            setNewWorkdayTasks(tasks)
            setUserId(workDayToEdit.userId)
        }
    }, [])
    console.log(newWorkday)
    // console.log(workDayTasks)
    // console.log(location.state.action)
    // const tasks = location.state.newWorkDay.workDayTasks

    // console.log(JSON.stringify(location.state.newWorkDay.workDayTasks))
    // console.log(location.state.newWorkDay.workDayTasks)
    const [workTasks, setWorkTasks] = useState([]);
    // console.log(newWorkdayTasks)
    const uniqueTaskIds = [...new Set(workDayTasks.map(task => task.workTaskId))]
    // console.log(uniqueTaskIds)

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

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if (location.state.action == 'add') {
        //     newWorkday.workDayTasks = newWorkdayTasks.map((task) => {
        //         JSON.parse(task)
        //     })
        // }
        if (location.state.action == 'edit') {
            try {
                const response = await fetch('https://localhost:7019/api/EmployeeWorkDays/edit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newWorkday)
                })

                if (response.ok) {
                    toast.success('Work day succesfully added!');
                    navigate('/', { state: { showToast: true, message: 'Work day succesfully updated!' } })
                }
                else {
                    toast.error('Workday failed to update');
                }
            }
            catch (error) {
                toast.error('An error occured')
            }
        }
        else {
            try {
                const response = await fetch('https://localhost:7019/api/EmployeeWorkDays', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newWorkday)
                })

                if (response.ok) {
                    toast.success('Work day succesfully added!');
                    navigate('/', { state: { showToast: true, message: 'Work day succesfully added!' } })
                }
                else {
                    toast.error('Workday failed to submit');
                }
            } catch (error) {
                toast.error('An error occured')
            }
        }
    }

    return (
        <>
            <div className="container pt-3 m-auto">
                <PageTitle title={title} />
                <ToastContainer />
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
                                <input htmlFor="CustomerName" className="form-control" onChange={(e) => setCustomerName(e.target.value)} value={customerName} />
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
                        {
                            uniqueTaskIds != null ?
                                <>
                                    <Collapsible cat={"General Labor"} updateTaskList={handleCheckboxChange} selectedTasks={uniqueTaskIds}></Collapsible>
                                    <Collapsible cat={"Hardscape"} updateTaskList={handleCheckboxChange} selectedTasks={uniqueTaskIds}></Collapsible>
                                    <Collapsible cat={"Irrigation"} updateTaskList={handleCheckboxChange} selectedTasks={uniqueTaskIds}></Collapsible>
                                </> :
                                <>
                                </>
                        }

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