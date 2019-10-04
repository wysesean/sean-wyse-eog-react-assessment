import { Action } from "redux";
import { Measurement } from "./../../types/Metric.types";

export enum MetricsActionTypes {
  API_ERROR = "EVENT/API_ERROR_RECEIVED",
  METRICS_RECEIVED = "EVENT/METRICS_RECEIVED",
  METRICS_SELECTED = "EVENT/METRICS_SELECTED",
  GET_MEASUREMENTS_SUCCESS = "GET_MEASUREMENTS_SUCCESS",
  GET_MEASUREMENTS_ERROR = "GET_MEASUREMENTS_ERROR",
  NEW_MEASUREMENT_RECEIVED = "NEW_MEASUREMENT_RECEIVED",
  SUBSCRIPTION_ERROR = "SUBSCRIPTION_ERROR"
}

export interface APIErrorAction extends Action<MetricsActionTypes.API_ERROR> {
  error: string;
}

export interface MetricsSelectedAction
  extends Action<MetricsActionTypes.METRICS_SELECTED> {
  selected: string[];
  time: number;
}

export interface MetricsReceivedAction
  extends Action<MetricsActionTypes.METRICS_RECEIVED> {
  getMetrics: string[];
}

export interface GetMeasurementsSuccess
  extends Action<MetricsActionTypes.GET_MEASUREMENTS_SUCCESS> {
  getMultipleMeasurements: { metric: string; measurements: Measurement[] }[];
}

export interface GetMeasurementsError
  extends Action<MetricsActionTypes.GET_MEASUREMENTS_ERROR> {
  error: string;
}

export interface NewMeasurementReceivedAction
  extends Action<MetricsActionTypes.NEW_MEASUREMENT_RECEIVED> {
  newMeasurement: Measurement;
}

export interface SubscriptionErrorAction
  extends Action<MetricsActionTypes.SUBSCRIPTION_ERROR> {
  error: string;
}

export type MetricsActions =
  | APIErrorAction
  | MetricsReceivedAction
  | MetricsSelectedAction
  | GetMeasurementsSuccess
  | GetMeasurementsError
  | NewMeasurementReceivedAction
  | SubscriptionErrorAction;
