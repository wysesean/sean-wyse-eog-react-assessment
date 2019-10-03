import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: theme.palette.background.main,
    height: "100vh"
  }
}));

export default ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};
