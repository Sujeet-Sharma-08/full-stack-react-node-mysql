import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData : null,
        isAuthLoading: true,
        forgotPasswordEmail:null,
        forgotPasswordOtp: null
    },
    reducers: {
        setUserData:(state, action)=>{
            state.userData = action.payload;
            state.isAuthLoading = false
        },
        
        logoutUser:(state)=>{
            state.userData = null;
            state.isAuthLoading = false
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

    }

})

export const {  setUserData, logoutUser ,setForgotPasswordEmail, clearForgotPasswordEmail , setForgotPasswordOtp , clearForgotPasswordOtp} = userSlice.actions;
export default userSlice.reducer;


