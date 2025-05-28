import React from 'react'
import { useState, useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import { ToastContainer, toast } from 'react-toastify'

const ManageUsers = () => {
    const [title, setTitle] = useState("Manage Users");
    const [users, setUsers] = useState();
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(baseUrl + 'AppUsers', {
                    credentials: 'include'
                })
                const json = await response.json();
                if (response.ok) {
                    setUsers(json);
                }
            }
            catch (error) {
                toast.error('An error occured handling your reequest')
            }
        }

        getUsers();
    }, [])
    console.log(users);
    return (
        <div className="container pt-3">
            <PageTitle title={title}></PageTitle>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default ManageUsers