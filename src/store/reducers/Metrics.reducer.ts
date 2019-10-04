import { Measurement } from "./../../types/Metric.types";
import {
  MetricsActions,
  MetricsActionTypes,
  MetricsReceivedAction,
  MetricsSelectedAction,
  GetMeasurementsSuccess
} from "../actions/Metric.actions";
export interface MetricState {
  firstTime: number,
  metrics: string[];
  measurements: {
    metric: string,
    unit: string,
    measurements: Measurement[]
  }[];
  selected: string[];
}

const initialState: MetricState = {
  firstTime: (new Date()).valueOf(),
  metrics: [],
  measurements: [],
  selected: []
};

const metricsRecevied = (state: MetricState, action: MetricsActions) => {
  const { getMetrics } = action as MetricsReceivedAction;
  return {
    ...state,
    metrics: getMetrics
  };
};

const handleError = (state: MetricState, action: MetricsActions) => state;

const selectMetrics = (state: MetricState, action: MetricsActions) => {
  const { selected } = action as MetricsSelectedAction;
  return {
    ...state,
    selected
  };
};

const getMeasurementsSuccess = (
  state: MetricState,
  action: MetricsActions
) => {
  const { getMultipleMeasurements } = action as GetMeasurementsSuccess;
  return {
    ...state,
    measurements: getMultipleMeasurements
  };
};

const handlers = {
  [MetricsActionTypes.METRICS_RECEIVED]: metricsRecevied,
  [MetricsActionTypes.METRICS_SELECTED]: selectMetrics,
  [MetricsActionTypes.GET_MEASUREMENTS_SUCCESS]: getMeasurementsSuccess,
  [MetricsActionTypes.GET_MEASUREMENTS_ERROR]: handleError,
  [MetricsActionTypes.API_ERROR]: handleError
};

export default (state = initialState, action: MetricsActions) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
