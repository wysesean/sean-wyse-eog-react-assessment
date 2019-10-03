import { Action } from "redux";

export enum MetricsActionTypes {
  API_ERROR = "EVENT/API_ERROR_RECEIVED",
  METRICS_RECEIVED = "EVENT/METRICS_RECEIVED",
  METRICS_SELECTED = "EVENT/METRICS_SELECTED"
}

export interface APIErrorAction extends Action<MetricsActionTypes.API_ERROR> {
  error: string;
}

export interface MetricsSelectedAction
  extends Action<MetricsActionTypes.METRICS_SELECTED> {
  selected: string[];
}

export interface MetricsReceivedAction
  extends Action<MetricsActionTypes.METRICS_RECEIVED> {
  getMetrics: string[];
}

export type MetricsActions =
  | APIErrorAction
  | MetricsReceivedAction
  | MetricsSelectedAction;
