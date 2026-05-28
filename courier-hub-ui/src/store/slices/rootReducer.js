import { combineReducers } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import packageSlice from "./packageSlice";
import trackingHistorySlice from "./trackingHistorySlice";

const rootReducer = combineReducers({
    packageDetails: packageSlice,
    userDetails: authSlice,
    trackingHistory: trackingHistorySlice
})

export default rootReducer