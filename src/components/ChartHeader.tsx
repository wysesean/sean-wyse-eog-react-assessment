import gql from 'graphql-tag';
import React, { ChangeEvent, useEffect } from 'react';
import {
  Checkbox,
  Chip,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select
  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Measurement } from '../types/Metric.types';
import { MetricsActionTypes } from '../store/actions/Metric.actions';
import { RootState } from '../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useSubscription } from 'urql';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexGrow: 1,
    margin: "8px 16px"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: "2px"
  },
  paper: {
    width: "100%",
    padding: "8px"
  },
  formControl: {
    width: "100%"
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const query = `
query {
  getMetrics
}
`;
const NewMeasurementSubQuery = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

const getMetrics = (state: RootState) => {
  const { selected, metrics, firstTime, measurements } = state.metrics;

  return {
    selected,
    metrics,
    firstTime,
    measurements
  };
};

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selected, metrics, firstTime, measurements } = useSelector(
    getMetrics
  );

  const handleChange = (event: ChangeEvent<any>): void => {
    dispatch({
      type: MetricsActionTypes.METRICS_SELECTED,
      selected: event.target.value,
      time: firstTime
    });
  };
  const handleSubscription: any = (
    measurements: any[] = [],
    response: { newMeasurement: Measurement }
  ) => {
    if (selected.length === 0) {
      return [];
    }
    dispatch({
      type: MetricsActionTypes.NEW_MEASUREMENT_RECEIVED,
      ...response
    });
    return [response.newMeasurement, ...measurements];
  };

  const [result] = useQuery({
    query
  });
  const [subscriptionResult] = useSubscription(
    { query: NewMeasurementSubQuery },
    handleSubscription
  );
  const { data, error } = result;

  if (subscriptionResult.error !== undefined) {
    dispatch({
      type: MetricsActionTypes.SUBSCRIPTION_ERROR,
      error: subscriptionResult.error
    });
  }

  useEffect(() => {
    if (error) {
      dispatch({ type: MetricsActionTypes.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch({
      type: MetricsActionTypes.METRICS_RECEIVED,
      getMetrics
    });
  }, [dispatch, data, error]);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Metrics</InputLabel>
          <Select
            multiple
            value={selected}
            onChange={handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={(selected: any) => (
              <div className={classes.chips}>
                {measurements.map((value: any) => (
                  <Chip
                    key={value.metric}
                    label={`${value.metric}: ${value.latestMeasurement.value} ${value.latestMeasurement.unit}`}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {metrics.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selected.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </div>
  );
};
