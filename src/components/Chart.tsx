import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    margin: "5% 25%"
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
        <h1>I am a chart</h1>
    </Paper>
  );
};
