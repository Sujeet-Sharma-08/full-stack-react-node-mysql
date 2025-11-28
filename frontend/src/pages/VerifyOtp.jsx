import React, { useState, useRef } from 'react';
import apiConnector from '../api/apiConnector';
import { toast } from 'react-toastify';
import { Verified } from 'lucide-react';

const VerifyOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef([]);

    const handleChange = (value, index) => {
        // Allow only one number
        if (!/^\d$/.test(value) && value !== "") return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < otp.length - 1) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous on backspace
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handleVerifyOtp= async(e)=>{
        e.preventDefault();

        try {
            console.log("hello")
            const {otp} = otp;
             console.log("hello", otp)
            const response = await apiConnector.post('/user/v1/verify-otp', {otp});

            toast.success(response.data.message || "OTP Verified successfully")
            setOtp({otp:""})
            
        } catch (error) {
            toast.error(error.response.data.message || "something went wrong!")
        }
    }

    return (
        <div className='flex mx-auto w-full justify-center items-center'>
            <div className='py-20'>
                <div className='text-center font-bold italic mb-3 text-2xl'>
                    <p>Enter your OTP</p>
                </div>

                <div className='w-140 h-60 bg-gray-100 rounded-lg'>
                    <form >
                        <div className='flex justify-center items-center gap-5 py-10'>
                        {otp.map((val, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={val}
                                ref={(el) => (inputRef.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className='h-14 w-14 rounded-lg border border-gray-500 text-center text-2xl
                                           [appearance:textfield] 
                                           [&::-webkit-inner-spin-button]:appearance-none 
                                           [&::-webkit-outer-spin-button]:appearance-none'
                            />
                        ))}

                        </div>
                          <button onClick={handleVerifyOtp} className='flex border-2 border-black h-10 w-30 justify-center mt-10  ml-56 items-center rounded-xl bg-yellow-300'>Verify OTP</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
