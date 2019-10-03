import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "5% 25%"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
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

const metrics = [
  "tubingPressure",
  "flareTemp",
  "injValveOpen",
  "oilTemp",
  "casingPRessure",
  "waterTemp"
];

export default () => {
  const classes = useStyles();
  const [metricName, setMetrics] = React.useState<string[]>([]);

  const handleChange = (event: any) => {
    setMetrics(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Metrics</InputLabel>
          <Select
            multiple
            value={metricName}
            onChange={handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => (selected as string[]).join(", ")}
            MenuProps={MenuProps}
          >
            {metrics.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={metricName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};
