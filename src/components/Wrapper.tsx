import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import UIThemes from '../themes/ui-themes'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: UIThemes.background.main,
    height: "100vh"
  }
}));

export default ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};
