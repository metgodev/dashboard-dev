import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Lottie from 'react-lottie';
import animatedErr from '../../Assets/lottie/AnimatedError404.json'
// styles
import useStyles from "./styles";
<<<<<<< HEAD
import term from "../../terms";

=======
import term from '../../terms';

const options = {
  loop: true,
  autoplay: true,
  animationData: animatedErr,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
>>>>>>> ca6096c2cd7d413ec2c605437e6d687e57e901c5

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
