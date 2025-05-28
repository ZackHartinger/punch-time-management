import React, { useState } from 'react'
import { useEffect } from 'react';

const Collapsible = ({ cat, updateTaskList, selectedTasks }) => {
    const [taskList, setTaskList] = useState([]);
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    useEffect(() => {
        fetch(baseUrl + `WorkTasks/category/${cat}`)
            .then((res) => res.json())
            .then((data) => {
                setTaskList(data);
            })
    }, [])

    const category = cat;
    // Remove spaces form category so that they can be used as HTML ids for collapsible functionality
    const trimmedCategory = category.replace(/\s+/g, "");
    const bsTarget = "#" + trimmedCategory;

    return (
        <div className="row mb-3">
            <div className="col-1"></div>
            <div className="collapsible col-md-8 pb-0">
                <button className="collapsible-btn btn w-100 mb-0" type="button" data-bs-toggle="collapse" data-bs-target={bsTarget} aria-expanded="false" aria-controls="collapsible">
                    <h2>{category}</h2>
                </button>
                <div className="collapse collapsible-content mt-0" id={trimmedCategory}>
                    <div>
                        <ul className="">
                            {taskList.map(task =>
                                // checks if any tasks are currently selected and will render the checkbox as checked if true
                                selectedTasks != null && selectedTasks.includes(task.workTaskId) ?
                                    < li className="list-group-item p-3" >
                                        <label>
                                            {/* Need to change the value to the task id once front end is making calls to the API */}
                                            <input className="me-3" type="checkbox" checked={true} value={JSON.stringify(task)} onChange={updateTaskList}></input>
                                            {task.description}
                                        </label>
                                    </li> :
                                    < li className="list-group-item p-3" >
                                        <label>
                                            {/* Need to change the value to the task id once front end is making calls to the API */}
                                            <input className="me-3" type="checkbox" value={JSON.stringify(task)} onChange={updateTaskList}></input>
                                            {task.description}
                                        </label>
                                    </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Collapsible