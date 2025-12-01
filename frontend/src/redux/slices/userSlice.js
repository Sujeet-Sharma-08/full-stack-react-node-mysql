import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
        userData :null
    },
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload;
        },

        logoutUser: (state) => {
            state.token = null;
        },

        getUser:(state, action)=>{
            state.userData = action.payload;
        }
    }

})

export const { loginUser, logoutUser, getUser } = userSlice.actions;
export default userSlice.reducer;


