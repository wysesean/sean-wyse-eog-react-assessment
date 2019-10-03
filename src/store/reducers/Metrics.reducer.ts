import {
  MetricsActions,
  MetricsActionTypes,
  MetricsReceivedAction,
  MetricsSelectedAction
} from "../actions/Metric.actions";

export interface MetricState {
  metrics: string[],
  selected: string[]
}

const initialState: MetricState = {
    metrics: [],
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
}

const handlers = {
  [MetricsActionTypes.METRICS_RECEIVED]: metricsRecevied,
  [MetricsActionTypes.METRICS_SELECTED]: selectMetrics,
  [MetricsActionTypes.API_ERROR]: handleError
};

export default (state = initialState, action: MetricsActions) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
