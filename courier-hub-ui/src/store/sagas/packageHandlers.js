import { call, put } from "redux-saga/effects";
import {
  setCreatePackage,
  setCreatePackageError,
  setDashboardData,
  setDashboardError,
  setPackages,
  setPackagesError,
} from "../slices/packageSlice";
import {
  requestCreateCourier,
  requestDashboardData,
  requestPackagesList,
} from "../../api/packagesApi";

export function* handleCreateCourier(action) {
  try {
    const response = yield call(requestCreateCourier, action.payload);
    const { data } = response;
    yield put(
      setCreatePackage({
        ...data,
      }),
    );
  } catch (error) {
    console.log("error", error);
    yield put(
      setCreatePackageError({
        error: error.message,
      }),
    );
  }
}

export function* handleGetPackages(action) {
  try {
    const response = yield call(requestPackagesList, action.payload);
    const { data } = response;
    yield put(
      setPackages({
        ...data,
      }),
    );
  } catch (error) {
    console.log("error", error);
    yield put(
      setPackagesError({
        error: error.message,
      }),
    );
  }
}

export function* handleDashboardData(action) {
  try {
    const response = yield call(requestDashboardData, action.payload);
    const { data } = response;
    yield put(
      setDashboardData({
        ...data,
      }),
    );
  } catch (error) {
    console.log("error", error);
    yield put(
      setDashboardError({
        error: error.message,
      }),
    );
  }
}
