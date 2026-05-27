import { call, put } from "redux-saga/effects";
import { setLogin, setLoginError } from "../slices/authSlice";
import { requestLogin } from "../../api/authApi";

export function* handleLogin(action) {
  try {
    const response = yield call(requestLogin, action.payload);
    const { data } = response;
    yield put(
      setLogin({
        ...data,
      }),
    );
  } catch (error) {
    yield put(
      setLoginError({
        error:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      }),
    );
  }
}
