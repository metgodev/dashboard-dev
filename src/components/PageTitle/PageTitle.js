import React from "react";
import { Button, Box } from "@material-ui/core";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector, useDispatch } from "react-redux";
import { set_theme_color } from "../../REDUX/actions/main.actions";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";
import HeaderButtons from "../HeaderButtons/HeaderButtons";
import Calendar from "../Calendar/Calendar";

export default function PageTitle(props) {
  let classes = useStyles(),
    dispatch = useDispatch(),
    { theme } = useSelector(s => s.mainRememberReducer),
    { mobile } = useSelector(s => s.mainReducer)

  const ColorChange = () => {
    dispatch(set_theme_color(!theme))
  };

  return (
    <Box className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h2" size="sm">
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
        <FormGroup style={{ direction: 'ltr' }}>
          <FormControlLabel control={<Switch
            checked={theme}
            onChange={ColorChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label={theme ? 'light' : 'dark'} />
        </FormGroup>
      )}
      <Box className={classes.boxWrapper}>
        {props.calendar && mobile &&
          (<Calendar type={2} />)
        }
        {props.buttonGroup && mobile && (
          <HeaderButtons btns={props.buttonGroup.btns} />
        )}
      </Box>
    </Box>
  );
}
