import { Action } from 'redux';
import { Weather } from '../../types/Weather.types';

export enum WeatherActionTypes {
  API_ERROR = "EVENT/API_ERROR_RECEIVED",
  WEATHER_DATA_RECEIVED = "EVENT/WEATHER_DATA_RECEIVED"
}

export interface APIErrorAction extends Action<WeatherActionTypes.API_ERROR> {
  error: string;
}

export interface WeatherDataReceivedAction
  extends Action<WeatherActionTypes.WEATHER_DATA_RECEIVED> {
  getWeatherForLocation: Weather;
}

export type WeatherActions = APIErrorAction | WeatherDataReceivedAction;
