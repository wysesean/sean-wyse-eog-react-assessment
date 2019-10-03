import { WeatherActionTypes, APIErrorAction } from "../actions";
import { takeEvery, call } from "redux-saga/effects";
import { toast } from "react-toastify";

function* apiErrorReceived(action: APIErrorAction) {
  yield call(toast.error, `Error Received: ${action.error}`);
}

function* watchApiError() {
  yield takeEvery(WeatherActionTypes.API_ERROR, apiErrorReceived);
}

export default [watchApiError];
