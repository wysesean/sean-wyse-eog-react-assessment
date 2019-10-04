import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import React, { ChangeEvent, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { MetricsActionTypes } from '../store/actions/Metric.actions';
import { Paper } from '@material-ui/core';
import { RootState } from '../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';

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

const getMetrics = (state: RootState) => {
  const { selected, metrics, firstTime } = state.metrics;
  return {
    selected,
    metrics,
    firstTime
  };
};

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selected, metrics, firstTime } = useSelector(getMetrics);

  const handleChange = (event: ChangeEvent<any>): void => {
    dispatch({
      type: MetricsActionTypes.METRICS_SELECTED,
      selected: event.target.value,
      time: firstTime
    });
  };

  const [result] = useQuery({
    query
  });

  const { data, error } = result;

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
                {selected.map((value: any) => (
                  <Chip key={value} label={value} className={classes.chip} />
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
