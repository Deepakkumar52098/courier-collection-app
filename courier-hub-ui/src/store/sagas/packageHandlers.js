import { call, put } from "redux-saga/effects";
import {
  setCreatePackage,
  setCreatePackageError,
  setPackages,
  setPackagesError,
} from "../slices/packageSlice";
import {
  requestCreateCourier,
  requestGetPackages,
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
    const response = yield call(requestGetPackages, action.payload);
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
