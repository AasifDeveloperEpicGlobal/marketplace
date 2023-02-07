import { createSlice } from "@reduxjs/toolkit";



const navbarSlice = createSlice({
  name: "SideNav",
  initialState: {
    isNav: false,
  },
  reducers: {
    setNavBar: (state, action) => {
      return {
        ...state,
        isNav: action.payload,
      };
    },
  },
});

export default navbarSlice;
