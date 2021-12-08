import React from "react";
import { Button, Box } from "@material-ui/core";
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import TranslateIcon from '@mui/icons-material/Translate';
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
  const LangChange = () => {
    dispatch(set_theme_color('en'))
  };


  return (
    <div className={classes.pageTitleContainer}>
      <Box>
        <Button variant="contained" disableElevation>Days</Button>
        <Button color="error" variant="text" disableElevation color="primary">Weeks</Button>
        <Button variant="outlined" disableElevation color="success">Months</Button>
      </Box>
      <Typography className={classes.typo} variant="h1" size="sm">
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
      {props.switch && (
        <IconButton aria-label="delete" onClick={LangChange}>
          <TranslateIcon />
        </IconButton>
      )}
    </div>
  );
}
