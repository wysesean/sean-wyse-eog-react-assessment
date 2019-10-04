import { Weather } from '../../types/Weather.types';
import { WeatherActions, WeatherActionTypes, WeatherDataReceivedAction } from '../actions/Weather.actions';
export interface WeatherState extends Weather {
  temperatureinFahrenheit: number | null;
}

const initialState: WeatherState = {
  temperatureinCelsius: null,
  temperatureinFahrenheit: null,
  description: "",
  locationName: ""
};

const toF = (c: number) => (c * 9) / 5 + 32;

const weatherDataRecevied = (state: WeatherState, action: WeatherActions) => {
  const { getWeatherForLocation } = action as WeatherDataReceivedAction;
  const {
    description,
    locationName,
    temperatureinCelsius
  } = getWeatherForLocation;

  return {
    temperatureinCelsius,
    temperatureinFahrenheit: toF(temperatureinCelsius || 0),
    description,
    locationName
  };
};

const handleError = (state: WeatherState, action: WeatherActions) => state;

const handlers = {
  [WeatherActionTypes.WEATHER_DATA_RECEIVED]: weatherDataRecevied,
  [WeatherActionTypes.API_ERROR]: handleError
};

export default (state = initialState, action: WeatherActions) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
