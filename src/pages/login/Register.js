import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
import classnames from "classnames";
// styles
import useStyles from "./styles";
// logo
import google from "../../Assets/svgs/google.svg";

function Register() {
    let navigate = useNavigate()
    let classes = useStyles();
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [nameValue, setNameValue] = useState("");
    let [loginValue, setLoginValue] = useState("");
    let [passwordValue, setPasswordValue] = useState("");

    const loginUser = () => {
        navigate("/");
    }

    return (
        <div>
            <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                    Welcome!
                </Typography>
                <Typography variant="h2" className={classes.subGreeting}>
                    Create your account
                </Typography>
                <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                        Something is wrong with your login or password :(
                    </Typography>
                </Fade>
                <TextField
                    id="name"
                    InputProps={{
                        classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                        },
                    }}
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    margin="normal"
                    placeholder="Full Name"
                    type="email"
                    fullWidth
                />
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
                <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                        <CircularProgress size={26} />
                    ) : (
                        <Button
                            onClick={() => loginUser()}
                            disabled={
                                loginValue.length === 0 ||
                                passwordValue.length === 0 ||
                                nameValue.length === 0
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.createAccountButton}
                        >
                            Create your account
                        </Button>
                    )}
                </div>
                <div className={classes.formDividerContainer}>
                    <div className={classes.formDivider} />
                    <Typography className={classes.formDividerWord}>or</Typography>
                    <div className={classes.formDivider} />
                </div>
                <Button
                    size="large"
                    className={classnames(
                        classes.googleButton,
                        classes.googleButtonCreating,
                    )}
                >
                    <img src={google} alt="google" className={classes.googleIcon} />
                    &nbsp;Sign in with Google
                </Button>
            </React.Fragment>
        </div>
    )
}

export default Register
