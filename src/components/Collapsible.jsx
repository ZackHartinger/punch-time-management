import React, { useState } from 'react'

const Collapsible = ({ taskList, updateTaskList }) => {
    const category = taskList[0].category;
    // Remove spaces form category so that they can be used as HTML ids for collapsible funcitonality
    const trimmedCategory = category.replace(/\s+/g, "");
    const bsTarget = "#" + trimmedCategory;

    console.log(taskList)


    return (
        <div className="row mb-3">
            <div className="collapsible col-md-8 pb-0">
                <button className="collapsible-btn btn w-100 mb-0" type="button" data-bs-toggle="collapse" data-bs-target={bsTarget} aria-expanded="false" aria-controls="collapsible">
                    <h2>{category}</h2>
                </button>
                <div className="collapse collapsible-content mt-0" id={trimmedCategory}>
                    <div>
                        <ul className="">
                            {taskList.map(task =>
                                <li className="list-group-item p-3">
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
        </div>
    )
}

export default Collapsible