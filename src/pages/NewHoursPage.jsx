import Collapsible from "../components/Collapsible";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/AuthProvider";

const NewHoursPage = () => {
    // STATES
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    const [title, setTitle] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // get and format local time
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const todayString = today.toLocaleString('sv').split(' ')[0];

    // Form variables
    const [employeeWorkDayId, setEmployeeWorkDayId] = useState(0);
    const [customerName, setCustomerName] = useState("");
    const [date, setDate] = useState(todayString);
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("16:30");
    const [lunchDuration, setLunchDuration] = useState(30);
    const [lunchTime, setLunchTime] = useState("12:00");
    const [truckName, setTruckName] = useState("");
    const [mileage, setMileage] = useState(0);
    const [newWorkdayTasks, setNewWorkdayTasks] = useState([]); // newWorkdayTasks holds the JSON strings of checked values in the collapsible components I gave a 
    const [userId, setUserId] = useState(auth.user.id);
    const [workDayTaskErrorMessage, setWorkDayTaskErrorMessage] = useState("");
    const [checked, setChecked] = useState(false);

    const [workTasks, setWorkTasks] = useState([]);
    const categories = [...new Set(workTasks.map(workTask => workTask.category))]

    // this variable takes the JSON strings from the newWorkDayTasks array and parses them back into objects so that the entire object can be stringified without adding unwanted escape characters
    const workDayTasks = newWorkdayTasks.map((task) =>
        JSON.parse(task)
    );

    // gets the ids of currently selected tasks to be passed as a prop to the collapsible component
    const uniqueTaskIds = [...new Set(workDayTasks.map(task => task.workTaskId))]

    const newWorkday = {
        employeeWorkDayId,
        customerName,
        date,
        startTime,
        endTime,
        lunchTime,
        lunchDuration,
        userId,
        truckName,
        mileage,
        workDayTasks
    };


    // ONMOUNT
    useEffect(() => {
        if (location.state.action == 'add') {
            setTitle("Submit a new work day")
        }
        else if (location.state.action == 'edit') {
            setTitle("Edit work day")
        }
        else {
            setTitle("error")
        }
    })

    // checks the action variable to see if the user is editing a work day in which case it will populate the form fields with its values
    useEffect(() => {
        if (location.state.action == 'edit') {
            const workDayToEdit = location.state.newWorkDay
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


    // METHODS
    const handleCheck = () => {
        setChecked(!checked);
    }
    const handleSelectChange = (event) => {
        setTruckName(event.target.value);
    }

    const getWorkTasks = async () => {
        const response = await fetch(baseUrl + `worktasks/by-company/${auth.user.companies[0].companyId}`, {
            credentials: "include"
        })
        const json = await response.json();
        if (response.ok) {
            setWorkTasks(json);
        }
    }

    useEffect(() => {
        getWorkTasks();
    }, [])

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

    const onSubmit = async (data) => {
        if (newWorkday.workDayTasks.length == 0) {
            setWorkDayTaskErrorMessage("You must select at least one task to submit a workday");
        }
        else {
            setWorkDayTaskErrorMessage("");
            if (location.state.action == 'edit') {
                try {
                    const response = await fetch(baseUrl + 'EmployeeWorkDays/edit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newWorkday),
                        credentials: "include"
                    })

                    if (response.ok) {
                        toast.success('Work day succesfully added!', { autoClose: 3000 });
                        navigate('/', { state: { showToast: true, message: 'Work day succesfully updated!', autoClose: 3000 } })
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
                    const response = await fetch(baseUrl + 'EmployeeWorkDays', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newWorkday),
                        credentials: "include"
                    })

                    if (response.ok) {
                        toast.success('Work day succesfully added!', { autoClose: 3000 });
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
    }

    return (
        <>
            <div className="container pt-3 m-auto">
                <PageTitle title={title} />
                <ToastContainer />
                <div className="new-work-day-form form-group container">
                    {location.state.action == 'edit' && customerName != undefined || location.state.action == 'add' ?

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mb-2">
                                <div className="col-md-3">
                                    <label htmlFor="CustomerName" className="form-label float-md-end">Customer Name</label>
                                </div>
                                <div className="col-md-6">
                                    <input defaultValue={customerName} {...register("customerName", { required: "Customer name is a required field" })} autoComplete="off" htmlFor="CustomerName" className="form-control" onChange={(e) => setCustomerName(e.target.value)} value={customerName} />
                                </div>
                                <div className="col-md-3">
                                    {errors.customerName && <span className="text-danger">{errors.customerName.message}</span>}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-3">
                                    <label htmlFor="Date" className="form-label float-md-end">Date</label>
                                </div>
                                <div className="col-md-6">
                                    <input {...register("date", { required: "Date is a required field" })} value={date} type="date" htmlFor="Date" className="form-control" onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <div className="col-md-3">
                                    {errors.date && <span className="text-danger">{errors.date.message}</span>}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-3">
                                    <label htmlFor="StartTime" className="form-label float-md-end">Start Time</label>
                                </div>
                                <div className="col-md-6">
                                    <input {...register("startTime", { required: "Start time is a required field" })} value={startTime} htmlFor="StartTime" className="form-control" type="time" onChange={(e) => setStartTime(e.target.value)} />
                                </div>
                                <div className="col-md-3">
                                    {errors.startTime && <span className="text-danger">{errors.startTime.message}</span>}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-3">
                                    <label htmlFor="EndTime" className="form-label float-md-end">End Time</label>
                                </div>
                                <div className="col-md-6">
                                    <input {...register("endTime", { required: "End time is a required field" })} value={endTime} htmlFor="EndTime" className="form-control" type="time" onChange={(e) => setEndTime(e.target.value)} />
                                </div>
                                <div className="col-md-3">
                                    {errors.endTime && <span className="text-danger">{errors.endTime.message}</span>}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-3">
                                    <label htmlFor="LunchDuration" className="form-label float-md-end">Lunch Duration</label>
                                </div>
                                <div className="col-md-6">
                                    <select htmlFor="LunchDuration" className="form-select" onChange={(e) => setLunchDuration(e.target.value)}>
                                        <option value={0}>No Lunch</option>
                                        <option selected value={30}>30 minutes</option>
                                        <option value={60}>1 hour</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <span className="text-danger"></span>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-3">
                                    <label htmlFor="LunchTime" className="form-label float-md-end">Lunch time</label>
                                </div>
                                <div className="col-md-6">
                                    <input {...register("lunchTime", { required: "Lunch time is a required field" })} value={lunchTime} htmlFor="LunchTime" className="form-control" type="time" onChange={(e) => setLunchTime(e.target.value)} />
                                </div>
                                <div className="col-md-3">
                                    {errors.lunchTime && <span className="text-danger">{errors.lunchTime.message}</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-9 text-center">
                                    <label htmlFor="vehichleCheck">Do you need to enter vehicle and mileage information?</label>
                                    <input name="checkbox" className="ms-3" type="checkbox" checked={checked} onChange={handleCheck} id="vehicleCheck"></input>
                                </div>
                            </div>
                            {checked == true ? (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-md-3">
                                            <label htmlFor="TruckName" className="form-label float-md-end">Vehicle</label>
                                        </div>
                                        <div className="col-md-6">
                                            <select {...register("truckName", { required: "Please select an option to continue" })} className="form-select" onChange={handleSelectChange}>
                                                <option value="" disabled selected>Select a vehicle</option>
                                                <option value="T2">T2</option>
                                                <option value="Timmy">Timmy</option>
                                                <option value="Service Truck">Service Truck</option>
                                                <option value="Personal">Personal</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            {errors.truckName && <span className="text-danger">{errors.truckName.message}</span>}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-3">
                                            <label htmlFor="Mileage" className="form-label float-md-end">Mileage</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input {...register("mileage", { required: "Mileage is a required field" })} type="number" className="form-control" value={mileage} onChange={(e) => setMileage(e.target.value)}></input>
                                        </div>
                                        <div className="col-md-4">
                                            {errors.mileage && <span className="text-danger">{errors.mileage.message}</span>}
                                        </div>
                                    </div>
                                </>
                            ) :
                                (<></>)
                            }
                            <p className="col-9 text-center text-danger">{workDayTaskErrorMessage}</p>
                            {/* Collapsible components are created for each category of tasks. They hold a group of checkboxes that when checked, are added to the workDayTasks array in the employeeWorkday Object.Will create an algortithm to do this automatically as changes are made to the database */}
                            {
                                uniqueTaskIds != null || categories != null ?
                                    <>
                                        {categories.map(category =>
                                            <Collapsible cat={category} updateTaskList={handleCheckboxChange} selectedTasks={uniqueTaskIds}></Collapsible>
                                        )}
                                    </> :
                                    <>
                                    </>
                            }

                            <div className="row mt-4 mb-5">
                                <div className="col-3"></div>
                                <div className="col-md-4">
                                    <button className="btn btn-submit" type="submit">Submit Workday</button>
                                </div>
                            </div>
                        </form> :
                        <></>
                    }
                </div>
            </div >
        </>
    )
}

export default NewHoursPage;