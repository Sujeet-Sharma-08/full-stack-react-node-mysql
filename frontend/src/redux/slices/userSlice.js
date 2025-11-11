import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null
    },
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload;
        },

        logoutUser: (state) => {
            state.token = null;
        }
    }

})

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;


