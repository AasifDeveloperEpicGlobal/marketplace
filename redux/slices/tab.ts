import { createSlice } from "@reduxjs/toolkit";



const tabSlice = createSlice({
  name: "Tabtoggle",
  initialState: {
    isNav: false,
  },
  reducers: {
    setTabToggle: (state, action) => {
      return {
        ...state,
        isActive: action.payload,
      };
    },
  },
});

export default tabSlice;
