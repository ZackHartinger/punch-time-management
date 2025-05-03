import React from 'react'
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { useState } from 'react';

const LogIn = () => {
    const title = "Log In"
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    return (
        <div className='container mt-3 m-auto'>
            <PageTitle title={title} />
            <form onSubmit={handleSubmit()}>
                <div className="row mb-2">
                    <div className="col-md-3">
                        <label htmlFor="Email" className="form-label float-md-end">Email</label>
                    </div>
                    <div className="col-md-6">
                        <input  {...register("email", { required: "Email is a required field" })} htmlFor="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="col-md-3">
                        {errors.customerName && <span className="text-danger">{errors.customerName.message}</span>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-3">
                        <label htmlFor="Password" className="form-label float-md-end">Password</label>
                    </div>
                    <div className="col-md-6">
                        <input {...register("password", { required: "Password is a required field" })} value={password} htmlFor="Password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        {errors.date && <span className="text-danger">{errors.date.message}</span>}
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