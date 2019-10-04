import React from "react";
import { useMeasure } from "react-use";

import Paper from "@material-ui/core/Paper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { RootState } from "../store/index";

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

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const getMetrics = (state: RootState) => {
  const { selected, metrics } = state.metrics;
  return {
    selected,
    metrics
  };
};


export default () => {
  const classes = useStyles();
  const [ref, { width = 500, height = 300 }] = useMeasure();
  const { selected } = useSelector(getMetrics);

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
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" padding={{ top: 10, bottom: 0 }} />
          <YAxis yAxisId="right" padding={{ top: 10, bottom: 0 }} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Paper>
    </div>
  );
};
