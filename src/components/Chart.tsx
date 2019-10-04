 /* eslint-disable */
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
  } from 'recharts';
import { getRandomColor } from '../util/getRandomColor';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from '../store/index';
import { useMeasure } from 'react-use';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  chartContainer: {
    display: "flex",
    flexGrow: 1,
    margin: "8px 16px"
  },
  paper: {
    width: "100%"
  }
});

const getMetrics = (state: RootState) => {
  const { selected, metrics, firstTime, measurements, latestTime } = state.metrics;
  const data: any[] = Object.values(
    measurements
      .flatMap(measurement => measurement.measurements)
      .reduce((acc: any, measurement): any => {
        acc[measurement.at] = {
          ...acc[measurement.at],
          [measurement.metric]: measurement.value,
          time: measurement.at
        };
        return acc;
      }, {})
  );

  return {
    firstTime,
    selected,
    metrics,
    measurements,
    data,
    latestTime
  };
};
const timeFormatter = (tick: any) => dayjs(new Date(tick)).format('hh:mm');
const timeFormatterLabel = (tick: any) => dayjs(new Date(tick)).format('MMM DD YYYY hh:mm:ss A');

export default () => {
  const classes = useStyles();
  const [ref, { width = 500, height = 300 }] = useMeasure();
  const { measurements, data, latestTime } = useSelector(getMetrics);
  const ticks = Array(6).fill(null).map((_, index) => latestTime - (30 * 60 * 1000) * (index + 1)/6);
  return (
    <div ref={ref} className={classes.chartContainer}>
      <Paper className={classes.paper}>
        <LineChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            name="Date"
            scale="time"
            type="number"
            ticks={ticks}
            domain={[latestTime - (30 * 60 * 1000), latestTime]}
            tickFormatter={timeFormatter}
          />
          {measurements.map(measurement => {
            return (
              <YAxis
                key={measurement.metric}
                dataKey={measurement.metric}
                yAxisId={measurement.metric}
                padding={{ top: 10, bottom: 0 }}
                label={measurement.unit}
              />
            );
          })}
          <Tooltip labelFormatter={timeFormatterLabel} />
          <Legend />
          {measurements.map(measurement => {
            const randomColor = getRandomColor(measurement.metric);
            return (
              <Line
                key={measurement.metric}
                yAxisId={measurement.metric}
                dataKey={measurement.metric}
                label={measurement.unit}
                stroke={randomColor}
                dot={false}
              />
            );
          })}
        </LineChart>
      </Paper>
    </div>
  );
};
