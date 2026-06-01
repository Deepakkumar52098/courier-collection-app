import { takeEvery, takeLatest } from "redux-saga/effects";
import { handleLogin } from "./authHandlers";
import { fetchLogin } from "../slices/authSlice";
import { handleCreateCourier, handleDashboardData, handleGetPackages } from "./packageHandlers";
import { createPackage, fetchDashboardData, fetchPackages } from "../slices/packageSlice";
import { handleTrackingHistory } from "./trackingHistoryHandler";
import { getTrackingHistory } from "../slices/trackingHistorySlice";


export function* watcherSaga() {
    yield takeEvery(fetchDashboardData, handleDashboardData)
    yield takeLatest(createPackage, handleCreateCourier)
    yield takeEvery(fetchPackages, handleGetPackages)
    yield takeEvery(fetchLogin, handleLogin)
    yield takeEvery(getTrackingHistory, handleTrackingHistory)
}