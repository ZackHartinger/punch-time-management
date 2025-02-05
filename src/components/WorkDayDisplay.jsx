import React from 'react'
import { useState } from 'react'
import WorkDayCard from './WorkDayCard'

const WorkDayDisplay = ({ filteredWorkdays }) => {

    const workdayData = filteredWorkdays.map((employeeWorkdays, i) => {
        return (
            <div className='work-day-card p-3 rounded shadow-lg mb-4'>
                <h2 className='card-header mb-1 fw-bolder'>{employeeWorkdays[i].FirstName} {employeeWorkdays[i].LastName}</h2>
                <div className="work-day-details ms-0 mb-0 p-4 rounded-bottom shadow-lg">
                    {employeeWorkdays.map(workday =>
                        <>
                            <div className="row mb-3" >
                                <div className="col-12 col-lg-3">
                                    <h4 className='fw-bolder'>{workday.Date}</h4>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <h4>{workday.CustomerName}</h4>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <h4 className='text-decoration-underline'>{workday.StartTime} - {workday.EndTime},
                                        {workday.LunchDuration} lunch at {workday.LunchTime}</h4>
                                </div>
                            </div>
                            <div className="row">
                                <h5 className='work-day-tasks col-12'>
                                    {
                                        workday.WorkDayTasks.map((task, index) =>

                                            <span key={index}>
                                                {task.Description}
                                                {index < workday.WorkDayTasks.length - 1 && ', '}
                                            </span>

                                        )
                                    }
                                </h5>
                            </div>
                            <hr></hr>
                        </>
                    )}
                </div>
            </div>
        )

    }
    )

    return (
        <>
            {workdayData}
        </>
    )
}

export default WorkDayDisplay