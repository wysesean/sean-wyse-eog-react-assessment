import { NewMeasurementReceivedAction } from "./../actions/Metric.actions";
import {
  GetMeasurementsSuccess,
  MetricsActions,
  MetricsActionTypes,
  MetricsReceivedAction,
  MetricsSelectedAction
} from "../actions/Metric.actions";
import { Measurement } from "./../../types/Metric.types";
export interface MetricState {
  firstTime: number;
  latestTime: number;
  metrics: string[];
  measurements: {
    metric: string;
    unit: string;
    measurements: Measurement[];
    latestMeasurement: Measurement;
  }[];
  selected: string[];
}

const initialState: MetricState = {
  latestTime: new Date().valueOf(),
  firstTime: new Date().valueOf(),
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

const getMeasurementsSuccess = (state: MetricState, action: MetricsActions) => {
  const { getMultipleMeasurements } = action as GetMeasurementsSuccess;
  const measurements = getMultipleMeasurements.reduce((acc, val): any => {
    const measurement = {
      metric: val.metric,
      unit: val.measurements[0].unit,
      measurements: val.measurements,
      latestMeasurement: val.measurements[val.measurements.length - 1]
    };
    return [...acc, measurement];
  }, []);
  return {
    ...state,
    measurements,
    latestTime: new Date().valueOf()
  };
};

const handleNewMeasurement = (state: MetricState, action: MetricsActions) => {
  const { newMeasurement } = action as NewMeasurementReceivedAction;
  return {
    ...state,
    latestTime: new Date().valueOf(),
    measurements: state.measurements.map(measurement => {
      if (measurement.metric === newMeasurement.metric) {
        return {
          ...measurement,
          latestMeasurement: newMeasurement,
          measurements: [...measurement.measurements, newMeasurement]
        };
      }
      return measurement;
    })
  }
};

const handlers = {
  [MetricsActionTypes.METRICS_RECEIVED]: metricsRecevied,
  [MetricsActionTypes.METRICS_SELECTED]: selectMetrics,
  [MetricsActionTypes.GET_MEASUREMENTS_SUCCESS]: getMeasurementsSuccess,
  [MetricsActionTypes.GET_MEASUREMENTS_ERROR]: handleError,
  [MetricsActionTypes.NEW_MEASUREMENT_RECEIVED]: handleNewMeasurement,
  [MetricsActionTypes.SUBSCRIPTION_ERROR]: handleError,
  [MetricsActionTypes.API_ERROR]: handleError
};

export default (state = initialState, action: MetricsActions) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
