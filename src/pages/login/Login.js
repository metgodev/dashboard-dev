import React, { useState } from "react";
import { Grid, Typography, Tabs, Tab } from "@material-ui/core";
// styles
import useStyles from "./styles";

// logo
import logo from "../../Assets/svgs/MTN.svg";
import Register from "./Register";
import SignUp from "./SignUp";

function Login() {
  let classes = useStyles();

  // local
  let [activeTabId, setActiveTabId] = useState(0);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Metro Travel</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (<SignUp />)}
          {activeTabId === 1 && (<Register />)}
        </div>
      </div>
    </Grid>
  );
}

export default Login;
