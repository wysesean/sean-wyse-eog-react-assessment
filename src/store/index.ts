import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import weatherReducer, { WeatherState } from "./reducers/Weather.reducer";
import metricsReducer, { MetricState } from "./reducers/Metrics.reducer";

export interface RootState {
  weather: WeatherState;
  metrics: MetricState
}

export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
    metrics: metricsReducer
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore<RootState, any, any, any>(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
