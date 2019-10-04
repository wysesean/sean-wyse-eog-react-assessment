import { APIErrorAction, WeatherActionTypes } from '../actions/Weather.actions';
import { call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

function* apiErrorReceived(action: APIErrorAction) {
  yield call(toast.error, `Error Received: ${action.error}`);
}

function* watchApiError() {
  yield takeEvery(WeatherActionTypes.API_ERROR, apiErrorReceived);
}

export default [watchApiError];
