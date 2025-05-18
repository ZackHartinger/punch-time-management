import React from 'react'
import { useState } from 'react'
import PageTitle from '../components/PageTitle'

const ManageUsers = () => {
    const [title, setTitle] = useState("Manage Users")
    return (
        <div className="container pt-3">
            <PageTitle title={title}></PageTitle>
        </div>
    )
}

export default ManageUsers