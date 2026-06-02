import { call, put } from "redux-saga/effects";
import {
  setTrackingHistory,
  setTrackingHistoryError,
} from "../slices/trackingHistorySlice";
import { requestTrackingHistory } from "../../api/trackingHistoryApi";

export function* handleTrackingHistory(action) {
  try {
    const response = yield call(requestTrackingHistory, action.payload);
    const { data } = response;
    yield put(
      setTrackingHistory({
        ...data,
      }),
    );
  } catch (error) {
    console.log("error", error);
    yield put(
      setTrackingHistoryError({
        error: error.message,
      }),
    );
  }
}
