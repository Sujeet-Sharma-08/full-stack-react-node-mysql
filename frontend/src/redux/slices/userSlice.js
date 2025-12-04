import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
        userData : null,
        forgotPasswordEmail:null,
        forgotPasswordOtp: null
    },
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload;
        },

        logoutUser: (state) => {
            state.token = null;
        },

        setUserData:(state, action)=>{
            state.userData = action.payload;
        },

        setForgotPasswordEmail : (state, action)=>{
            state.forgotPasswordEmail = action.payload;
        },

        clearForgotPasswordEmail:(state)=>{
            state.forgotPasswordEmail = null;
        },

        setForgotPasswordOtp :(state, action)=>{
            state.forgotPasswordOtp = action.payload;
        },

        clearForgotPasswordOtp :(state)=>{
            state.forgotPasswordOtp = null;
        },

        // setUpdatedUserData:(state, action)=>{
        //     state.userData = action.payload;
        // }
    }

})

export const { loginUser, logoutUser, setUserData ,setForgotPasswordEmail, clearForgotPasswordEmail , setForgotPasswordOtp , clearForgotPasswordOtp , setUpdatedUserData} = userSlice.actions;
export default userSlice.reducer;


