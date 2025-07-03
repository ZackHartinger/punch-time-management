import React from 'react'
import { useState } from 'react'
import WorkDayCard from './WorkDayCard'
import { to12Hour } from '../helpers/helpers'

const WorkDayDisplay = ({ filteredWorkdays }) => {
    const workdayData = filteredWorkdays.map((employeeWorkdays, index) => {
        return (
            <div className='work-day-card rounded mb-4' key={index}>
                {
                    employeeWorkdays[0].user.firstName == "Guest" ?
                        <h2 className='card-header mb-1 fw-bolder rounded-top'>{employeeWorkdays[0].user.firstName}</h2> :
                        <h2 className='card-header mb-1 fw-bolder rounded-top'>{employeeWorkdays[0].user.fullName}</h2>
                }
                <div className="work-day-details ms-0 mb-0 p-4 rounded-bottom ">
                    {employeeWorkdays.map(workday =>
                        <div key={workday.employeeWorkDayId}>
                            <div className='work-day'>
                                <div className="row mb-3">
                                    <div className="col-12 ">
                                        <h4 className='fw-bolder date'>{workday.date}</h4>
                                        <p className='float-end time'>{to12Hour(workday.startTime)} - {to12Hour(workday.endTime)}, {workday.lunchDuration} minute lunch at {to12Hour(workday.lunchTime)}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <h4>{workday.customerName}</h4>
                                </div>
                                {workday.truckName != "" ? (
                                    <>
                                        <div className="row">
                                            <p>Vehicle Name: {workday.truckName}</p>
                                        </div>
                                        <div className="row mb-3">
                                            <p> Mileage: {workday.mileage}</p>
                                        </div>
                                    </>
                                ) :
                                    (<></>)
                                }
                                <div className="row">
                                    <h5 className='work-day-tasks rounded col-12'>
                                        {
                                            // workDayTasks are seperated by comma per client request
                                            workday.workDayTasks.map((task, index) =>

                                                <span key={index}>
                                                    {task.workTask.description}
                                                    {index < workday.workDayTasks.length - 1 && ', '}
                                                </span>

                                            )
                                        }
                                    </h5>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    )}
                </div>
            </div>
        )

    }
    )

    return (
        workdayData != null ? (
            <>
                {workdayData}
            </>

        ) :
            <>
            </>
    )
}

export default WorkDayDisplay