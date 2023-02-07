import { createSlice } from "@reduxjs/toolkit";

interface IUser{
    _id: string,
    email: string,
    role: string,
}

interface UserState {
    user: IUser | null,
    token: string | null,
    isAuthenticated: boolean,
}

const initialState:UserState = {
    user: null,
    token:  null,
    isAuthenticated: false,
}



const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser:(state,action) => {
        action.payload.user ?  state.user = action.payload.user : undefined
        action.payload.isAuthenticated ? state.isAuthenticated = action.payload.isAuthenticated : undefined
        action.payload.token ? state.token = action.payload.token : undefined
    },
    resetUser: (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
    }
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice;
