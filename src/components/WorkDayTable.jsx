import React from 'react'

const WorkDayTable = ({ tableData }) => {
    return (
        <table class="table table-striped table-hover work-day-table rounded">
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
                    <tr className="work-day-table-row">
                        <td scope="row">{t.Date}</td>
                        <td>{t.CustomerName}</td>
                        <td>
                            <button className="btn btn-submit">Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-submit">Delete</button>
                        </td>
                    </tr>
                )}

            </tbody>
        </table>
    )
}

export default WorkDayTable