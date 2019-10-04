import React from 'react';
import UIThemes from '../themes/ui-themes';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: UIThemes.background.main,
    display: "flex",
    height: "100vh",
    flexDirection: "column"
  }
}));

export default ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};
