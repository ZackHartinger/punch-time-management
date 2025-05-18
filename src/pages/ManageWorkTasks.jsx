import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const ManageWorkTasks = () => {
    const [title, setTitle] = useState("Manage Work Tasks")
    return (
        <div className="container pt-3">
            <PageTitle title={title}></PageTitle>
        </div>
    )
}

export default ManageWorkTasks