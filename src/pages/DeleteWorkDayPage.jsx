import React from 'react'
import PageTitle from '../components/PageTitle'
import WorkDayDisplay from '../components/WorkDayDisplay'
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { to12Hour } from '../helpers/helpers';

const DeleteWorkDayPage = () => {
    const title = "Delete work day";

    const navigate = useNavigate();
    const location = useLocation();
    const fullName = location.state.fullName;
    const workDayToDelete = location.state.workDayToDelete;
    const employeeWorkDayId = workDayToDelete.employeeWorkDayId;
    console.log(employeeWorkDayId)
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:7019/api/EmployeeWorkDays/${employeeWorkDayId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            })

            if (response.ok) {
                toast.success('Work day succesfully deleted!');
                navigate('/', { state: { showToast: true, message: 'Work day succesfully deleted!' } })
            }
            else {
                toast.error('Workday failed to be deleted');
            }
        }
        catch (error) {
            toast.error('An error occured')
        }
    }

    const handleCancel = () => {
        navigate('/')
    }

    return (
        <div className='container pt-3'>
            <PageTitle title={title} />
            <div className='work-day-card p-3 rounded shadow-lg mb-4'>
                <h2 className='card-header mb-1 fw-bolder'>{fullName}</h2>
                <div className="work-day-details ms-0 mb-0 p-4 rounded-bottom shadow-lg">
                    <div className="row mb-3" >
                        <div className="col-12 col-lg-3">
                            <h4 className='fw-bolder'>{workDayToDelete.date}</h4>
                        </div>
                        <div className="col-12 col-lg-3">
                            <h4>{workDayToDelete.customerName}</h4>
                        </div>
                        <div className="col-12 col-lg-6">
                            <h4 className='text-decoration-underline'>{to12Hour(workDayToDelete.startTime)} - {to12Hour(workDayToDelete.endTime)}, {workDayToDelete.lunchDuration} minute lunch at {to12Hour(workDayToDelete.lunchTime)}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <h5 className='work-day-tasks col-12'>
                            {
                                // workDayTasks are seperated by comma per client request
                                workDayToDelete.workDayTasks.map((task, index) =>

                                    <span key={index}>
                                        {task.description}
                                        {index < workDayToDelete.workDayTasks.length - 1 && ', '}
                                    </span>

                                )
                            }
                        </h5>
                    </div>
                    <hr></hr>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-2"></div>
                <div className="col-md-4">
                    <button className="btn btn-submit" onClick={handleDelete}>Delete Workday</button>
                </div>
                <div className="col-md-4">
                    <button className='btn btn-submit' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWorkDayPage