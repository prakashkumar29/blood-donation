import { createSlice } from "@reduxjs/toolkit";
import { makeNotification } from "./actions";

const initialState = {
  snackBar: null,
  seeds: {},
  userInfo: {
    roleId: "",
    role: "",
    name: "",
    id: "",
    code: "",
    profileImageUrl: "",
    emailId: "",
    mobileNo: "",
    institutionId: "",
    isInstitution: "",
    institutionUserId: "",
  },
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: "app",
  initialState,
  reducers: {
    notifyUser: (state, action) => {
      state.snackBar = makeNotification(action.payload);
    },
    setSeed: (state, action) => {
      state.seeds = { ...state.seeds, ...action.payload };
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default reducer;
export const { notifyUser, setSeed, setUserInfo, setIsLoading } = actions;
