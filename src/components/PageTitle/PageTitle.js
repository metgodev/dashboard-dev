import React from "react";
import { Button } from "@material-ui/core";
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from "react-redux";
import { set_theme_color } from "../../REDUX/actions/main.actions";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";

export default function PageTitle(props) {
  let classes = useStyles(),
    dispatch = useDispatch(),
    { theme } = useSelector(state => state.mainRememberReducer);


  const ColorChange = () => {
    dispatch(set_theme_color(!theme))
  };

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h2" size="lg">
        {props.title}
      </Typography>
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
        >
          {props.button}
        </Button>
      )}
      {props.switch && (
        <Switch
          checked={theme}
          onChange={ColorChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )}
    </div>
  );
}
