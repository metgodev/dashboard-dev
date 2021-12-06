import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
// styles
import useStyles from "./styles";
// logo
import google from "../../Assets/svgs/google.svg";

function SignUp() {
    let classes = useStyles();
    let navigate = useNavigate()

    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [loginValue, setLoginValue] = useState("");
    let [passwordValue, setPasswordValue] = useState("");


    const loginUser = () => {
        navigate("/");
    }

    return (
        <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
                Metro Travel
            </Typography>
            <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
            </Button>
            <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
            </div>
            <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                    Something is wrong with your login or password :(
                </Typography>
            </Fade>
            <TextField
                id="email"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
            />
            <TextField
                id="password"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
            />
            <div className={classes.formButtons}>
                {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                        disabled={
                            loginValue.length === 0 || passwordValue.length === 0
                        }
                        onClick={() => loginUser()}
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Login
                    </Button>
                )}
                <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                >
                    Forget Password
                </Button>
            </div>
        </React.Fragment>
    )
}

export default SignUp
