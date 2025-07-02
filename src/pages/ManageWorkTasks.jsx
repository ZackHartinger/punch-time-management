import React, { useState } from 'react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import PageTitle from '../components/PageTitle'
import { useAuth } from '../hooks/AuthProvider'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'


const ManageWorkTasks = () => {
    const [title, setTitle] = useState("Manage Work Tasks")
    const auth = useAuth();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    const [workTasks, setWorkTasks] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [rerender, setRerender] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const getWorkTasks = async () => {
            try {
                const response = await fetch(baseUrl + `WorkTasks/by-company/${auth.user.companies[0].companyId}`, {
                    credentials: 'include'
                })
                const json = await response.json();
                if (response.ok) {
                    setWorkTasks(json);
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        getWorkTasks();
    }, [rerender])

    const handleDeleteClick = async (wt) => {
        const workTaskToDelete = {
            workTaskId: wt.workTaskId,
            category: wt.category,
            description: wt.description,
            isDeprecated: true,
            companyId: wt.companyId
        }
        try {
            const response = await fetch(baseUrl + `WorkTasks/${wt.workTaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workTaskToDelete),
                credentials: "include"
            })
            if (response.ok) {
                toast.success('Work task deleted!');
            }
            else {
                toast.error('Work task failed to delete, please try again')
            }
        }
        catch (error) {
            toast.error('An error occurred')
        }
        setRerender(rerender + 1);
    }
    console.log(rerender)
    const handleAddClick = async (wt) => {
        try {
            if (auth.user) {
                const newTask = {
                    category,
                    description,
                    isDeprecated: false,
                    companyId: auth.user.companies[0].companyId
                }
                const response = await fetch(baseUrl + 'WorkTasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask),
                    credentials: 'include'
                })

                if (response.ok) {
                    toast.success("Work task added!", { autoClose: 1000 });
                    setRerender(rerender + 1);
                    setCategory('');
                    setDescription('');
                }
            }
        }
        catch (error) {
            toast.error('An error has occurred, please try again')
        }
    }


    if (!workTasks) {
        return <></>
    }
    if (!auth.user) {
        return <></>
    }

    return (
        <div className="container pt-3">
            <PageTitle title={title}></PageTitle>
            <ToastContainer></ToastContainer>
            < table className="table table-striped table-hover work-day-table" >
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {workTasks.map(wt =>
                        <tr className="work-day-table-row" key={wt.workTaskId}>
                            <td scope="row">{wt.category}</td>
                            <td>{wt.description}</td>
                            <td>
                                <button className="btn btn-submit w-100" style={{ backgroundColor: 'crimson' }} onClick={() => handleDeleteClick(wt)}>Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table >
            <form onSubmit={handleSubmit(handleAddClick)}>
                <div className="row mb-2">
                    {/* <div className="col-md-2"></div> */}
                    <div className="col-md-4">
                        <label htmlFor="Category" className="form-label float-md-end">Category</label>
                    </div>
                    <div className="col-md-4">
                        <input defaultValue={category} {...register("category", { required: "You must enter a category" })} autoComplete="off" htmlFor="Category" className="form-control" onChange={(e) => setCategory(e.target.value)} value={category} />
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row mb-2">
                    {/* <div className="col-md-2"></div> */}
                    <div className="col-md-4">
                        <label htmlFor="Description" className="form-label float-md-end">Description</label>
                    </div>
                    <div className="col-md-4">
                        <input defaultValue={description}{...register("description", { required: "You must enter a description" })} autoComplete="off" htmlFor="Description" className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className='btn btn-submit' type='submit'>Add new task</button>
                    </div>
                    <div className="col-4"></div>
                </div>
            </form>
        </div>
    )
}

export default ManageWorkTasks