import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const WorkDayTable = ({ tableData, baseUrl }) => {
    const [selectedId, setSelectedId] = useState();
    const [selectedWorkDay, setSelectedWorkDay] = useState();

    const navigate = useNavigate();

    const handleEditClick = async (event) => {
        const selectedId = event.employeeWorkDayId

        const response = await fetch(baseUrl + `EmployeeWorkDays/${selectedId}`)
        const data = await response.json();
        await setSelectedWorkDay(data);

        navigate('/new-hours', { state: { newWorkDay: data, action: 'edit' } })
    }

    const handleDeleteClick = async (event) => {
        const selectedId = event.employeeWorkDayId;
        const fullName = event.user.fullName;

        const response = await fetch(baseUrl + `EmployeeWorkDays/${selectedId}`)
        const data = await response.json();
        await setSelectedWorkDay(data);

        navigate('/delete-work-day', { state: { workDayToDelete: data, fullName: fullName, action: 'delete' } })
    }

    // console log
    // console.log(selectedWorkDay)
    return (

        < table className="table table-striped table-hover work-day-table" >
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map(t =>
                    <tr className="work-day-table-row" key={t.employeeWorkDayId}>
                        <td scope="row">{t.date}</td>
                        <td>{t.customerName}</td>
                        <td>
                            <input type='hidden' value={t.employeeWorkDayId}></input>
                            <button className="btn btn-submit w-50" style={{ backgroundColor: '#53b700' }} onClick={() => handleEditClick(t)} ><FontAwesomeIcon icon={faPenSquare} /></button>
                        </td>
                        <td>
                            <button className="btn btn-submit w-50" style={{ backgroundColor: 'crimson' }} onClick={() => handleDeleteClick(t)}><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>
                )}

            </tbody>
        </table >
    )
}

export default WorkDayTable