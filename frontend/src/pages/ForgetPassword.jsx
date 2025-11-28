import React from 'react'
import { useState } from 'react';
import apiConnector from '../api/apiConnector'
import { toast } from 'react-toastify';

import { Navigate, useNavigate } from 'react-router-dom';


const ForgetPassword = () => {

    const navigate = useNavigate();

    const [emailData, setEmailData] = useState({ email:"" })

    const changeHandler = (e) => {
        setEmailData({ ...emailData, [e.target.name]:e.target.value })
    }

    const emailHandler = async (e) => {
        e.preventDefault();

        try {

            const {email} = emailData;

            const response = await apiConnector.post('/user/v1/forget-password', {email})

            toast.success(response.data.message)

            setEmailData({
                email :""
            })

            navigate('/verify-otp')
            
        } catch (error) {
            toast.error(error.response.data.message || "Failed to forgot password" )
        }
    }


    return (
        <div className='flex mx-auto w-full justify-center items-center '>
            <div className='py-20'>

                <form>
                    <p className='text-md italic font-semibold mb-4 text-center'>Enter you email, an otp will be sent on you registered email!</p>
                    <div className='w-140 h-60 bg-gray-100 rounded-lg '>
                        <p className='text-xl font-semibold text-center py-2'>Enter Your Registered Email Here</p>
                        <input className='py-3 w-100 mt-5 rounded-md ml-20 border border-gray-500 placeholder:text-gray-400 px-3'
                        type="email"
                        name='email' 
                        placeholder='enter you email'
                        value={emailData.email}
                        onChange={changeHandler}
                        />
                        <div className='flex border-2 border-black h-10 w-30 justify-center mt-10 ml-55 items-center rounded-xl bg-yellow-300'>
                            <button onClick={emailHandler} type='submit'>Send OTP</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword;