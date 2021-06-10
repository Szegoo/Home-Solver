import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload;
        }
    }
})
export const { setUser } = userSlice.actions;
export default userSlice.reducer;