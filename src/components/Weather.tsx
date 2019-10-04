import Chip from './Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect } from 'react';
import { RootState } from '../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useGeolocation } from 'react-use';
import { useQuery } from 'urql';
import { WeatherActionTypes } from '../store/actions/Weather.actions';

const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

const getWeather = (state: RootState) => {
  const { temperatureinFahrenheit, description, locationName } = state.weather;
  return {
    temperatureinFahrenheit,
    description,
    locationName
  };
};

export default () => {
  const getLocation = useGeolocation();
  // Default to houston
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698
  };
  const dispatch = useDispatch();
  const { temperatureinFahrenheit, description, locationName } = useSelector(
    getWeather
  );

  const [result] = useQuery({
    query,
    variables: {
      latLong
    }
  });
  const { fetching, data, error } = result;
  useEffect(
    () => {
      if (error) {
        dispatch({ type: WeatherActionTypes.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getWeatherForLocation } = data;
      dispatch({ type: WeatherActionTypes.WEATHER_DATA_RECEIVED, getWeatherForLocation });
    },
    [dispatch, data, error]
  );

  if (fetching) return <LinearProgress />;

  return (
    <Chip
      label={`Weather in ${locationName}: ${description} and ${Math.round(temperatureinFahrenheit || 0)}°`}
    />
  );
};
