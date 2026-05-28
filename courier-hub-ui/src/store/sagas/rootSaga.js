import { takeEvery, takeLatest } from "redux-saga/effects";
import { handleLogin } from "./authHandlers";
import { fetchLogin } from "../slices/authSlice";
import { handleCreateCourier, handleGetPackages } from "./packageHandlers";
import { createPackage, fetchPackages } from "../slices/packageSlice";
import { handleTrackingHistory } from "./trackingHistoryHandler";
import { getTrackingHistory } from "../slices/trackingHistorySlice";


export function* watcherSaga() {
    yield takeLatest(createPackage, handleCreateCourier)
    yield takeEvery(fetchPackages, handleGetPackages)
    yield takeEvery(fetchLogin, handleLogin)
    yield takeEvery(getTrackingHistory, handleTrackingHistory)
}