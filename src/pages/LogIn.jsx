import React from 'react'
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const LogIn = () => {
    const title = "Log In"
    const baseUrl = import.meta.env.VITE_PUNCH_API_BASE_URL;
    console.log("BaseURL: " + baseUrl)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const credentials = {
        email,
        password
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const auth = useAuth();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(baseUrl + 'AppUsers/log-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            })
            const json = await response.json();
            if (response.ok) {
                auth.setAuth(true);
                auth.setUser(json);
                localStorage.setItem('auth', true);
                navigate("/");
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'An error occured while attempting to log in.')
        }
    }
    return (
        <div className='container mt-3 m-auto'>
            <PageTitle title={title} />
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-2">
                    <div className="col-md-3">
                        <label htmlFor="Email" className="form-label float-md-end">Email</label>
                    </div>
                    <div className="col-md-6">
                        <input  {...register("email", { required: "Email is a required field" })} autoComplete="off" htmlFor="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="col-md-3">
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-3">
                        <label htmlFor="Password" className="form-label float-md-end">Password</label>
                    </div>
                    <div className="col-md-6">
                        <input {...register("password", { required: "Password is a required field" })} type='password' autoComplete='off' value={password} htmlFor="Password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                </div>
                <div className="row mt-4 mb-5">
                    <div className="col-3"></div>
                    <div className="col-md-4">
                        <button className="btn btn-submit" type="submit">Log In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LogIn
