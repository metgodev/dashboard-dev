import React from 'react';
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Lottie from 'react-lottie';
import animatedErr from '../../Assets/lottieFiles/AnimatedError404.json'
// styles
import useStyles from "./styles";

export default function Error() {
  let classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animatedErr,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.divRoot}>
      <Lottie width={500} height={500} options={defaultOptions} autoplay={true} loop={true}/>        
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
          size="large"
          className={classes.backButton}
        >
          Back to Home
        </Button>
      </div>
    </Grid>
  );
}
