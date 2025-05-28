import React from 'react'
import PageTitle from '../components/PageTitle'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const SignUp = () => {
    const title = "Sign Up"
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

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
                        <label htmlFor="FirstName" className="form-label float-md-end">First Name</label>
                    </div>
                    <div className="col-md-6">
                        <input  {...register("firstName", { required: "First Name is a required field" })} htmlFor="FirstName" className="form-control" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </div>
                    <div className="col-md-3">
                        {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-3">
                        <label htmlFor="LastName" className="form-label float-md-end">Last Name</label>
                    </div>
                    <div className="col-md-6">
                        <input  {...register("lastName", { required: "Last Name is a required field" })} htmlFor="LastName" className="form-control" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    </div>
                    <div className="col-md-3">
                        {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-3">
                        <label htmlFor="Email" className="form-label float-md-end">Email</label>
                    </div>
                    <div className="col-md-6">
                        <input  {...register("email", { required: "Email is a required field" })} htmlFor="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
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
                        <input {...register("password", { required: "Password is a required field" })} value={password} htmlFor="Password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-3">
                        <label htmlFor="ConfirmPassword" className="form-label float-md-end">Confirm Password</label>
                    </div>
                    <div className="col-md-6">
                        <input {...register("confirmPassword", { required: "Password is a required field" })} value={confirmPassword} htmlFor="ConfirmPassword" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                    </div>
                </div>
                <div className="row mt-4 mb-5">
                    <div className="col-3"></div>
                    <div className="col-md-4">
                        <button className="btn btn-submit" type="submit">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp