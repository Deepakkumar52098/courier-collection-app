import { combineReducers } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import packageSlice from "./packageSlice";

const rootReducer = combineReducers({
    packageDetails: packageSlice,
    userDetails: authSlice
})

export default rootReducer