import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Lottie from 'react-lottie';
import animatedErr from '../../Assets/lottie/AnimatedError404.json'
// styles
import useStyles from "./styles";
import term from "../../terms";


export default function Error() {
  let classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.divRoot}>
        <Lottie width={'80%'} height={'75%'} options={options} autoplay={true} loop={true} />
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/dashboard"
          size="large"
          className={classes.backButton}
        >
          {term('back_home')}
        </Button>
      </div>
    </Grid>
  );
}
