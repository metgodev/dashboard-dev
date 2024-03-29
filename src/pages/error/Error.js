import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import animatedErr from '../../Assets/lottie/AnimatedError404.json'
import { ROUTES } from '../../data/routes';
// styles
import useStyles from "./styles";
import term from "../../terms";

const options = {
  loop: true,
  autoplay: true,
  animationData: animatedErr,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function Error() {
  let classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.divRoot}>
        <Lottie width={'80%'} height={'75%'} options={options} autoplay={true} loop={true} />
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={ROUTES.DASHBOARD}
          size="large"
          className={classes.backButton}
        >
          {term('back_home')}
        </Button>
      </div>
    </Grid>
  );
}
