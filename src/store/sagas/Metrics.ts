import Api from '../api';
import { debounce, put } from 'redux-saga/effects';
import { MetricsActionTypes, MetricsSelectedAction } from '../actions/Metric.actions';

function* fetchSelectedMetrics(action: MetricsSelectedAction) {
  try {
    const { selected, time } = action;
    const { data } = yield Api.getMeasurements(selected, time);
    yield put({
      ...data,
      type: MetricsActionTypes.GET_MEASUREMENTS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: MetricsActionTypes.GET_MEASUREMENTS_ERROR,
      error
    });
  }
}

function* watchSelectedMetric() {
  yield debounce(
    500,
    MetricsActionTypes.METRICS_SELECTED,
    fetchSelectedMetrics
  );
}

export default [watchSelectedMetric];
