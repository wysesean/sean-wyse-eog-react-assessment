import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Weather from './Weather';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
});

export default () => {
  const classes = useStyles();

  const name = "Sean's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
