import React, { useState } from "react";
import { Grid, Typography, Tabs, Tab } from "@material-ui/core";
// styles
import useStyles from "./styles";

// logo
import logo from "../../Assets/svgs/MTN.svg";
import Register from "./adminLogin/Register";
import SignIn from "./adminLogin/SignIn";
import term from "../../terms"
import BusinessLogin from './businessLogin/BusinessLogin'
import BusinessRegister from './businessLogin/BusinessRegister'

function Login() {
  let classes = useStyles();

  // local
  let [activeTabId, setActiveTabId] = useState(0);
  const currentHref = window.location.href

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={term("log_in")} classes={{ root: classes.tab }} />
            <Tab label={term("sign_up")} classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (currentHref.split('/').includes('business') ? <BusinessLogin /> : <SignIn />)}
          {activeTabId === 1 && (currentHref.split('/').includes('business') ? <BusinessRegister /> : <Register />)}
        </div>
      </div>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>{term("met_go")}</Typography>
      </div>
    </Grid>
  );
}

export default Login;
