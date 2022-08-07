import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
// styles
import useStyles from "./styles";
import term from "../../terms";
import { Auth } from "../../API/metro";
import { useDispatch } from "react-redux";
import { set_user } from "../../REDUX/actions/main.actions";
import { loginWithEmailAndPassword } from "../../API/firebase";

function SignIn({ setLoggedIn }) {
    let classes = useStyles();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const LISTENER_TYPE = 'keydown'
    const LISTENER_FUNCTION = (e) => {
        if (e.key === 'Enter' && email.length !== 0 && password.length !== 0) {
            loginUser()
        }
    }

    const loginUser = async () => {
        setIsLoading(true)
        window.localStorage.clear()
        loginWithEmailAndPassword(email, password).then(res => {
            if (!res?.user) {
                setIsLoading(false)
                return
            }
            Auth(res.user.accessToken).then(res => {
                if (res.error) {
                    setError(res.error)
                } else {
                    let user = {
                        e: res.email,
                        fn: term('welcome_guest'),
                        ln: '',
                        v: res.isVerified,
                        id: res._id
                    }
                    dispatch(set_user(user));
                    setLoggedIn(true)
                    navigate('/dashboard')
                    setIsLoading(false);
                }
            })
        })
    }

    useEffect(() => {
        document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        document.addEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        return () => {
            document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        }
    }, [email, password])

    return (
        <>
            <Typography variant="h1" className={classes.greeting}>
                {term('met_go')}
            </Typography>
            <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                    {term('something_went_wrong')}
                </Typography>
            </Fade>
            <TextField
                variant="outlined"
                id="email"
                inputprops={{
                    classes: {
                        input: classes.textField,
                    },
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                margin="normal"
                placeholder={term('email_address')}
                type="email"
                fullWidth
            />
            <TextField
                variant="outlined"
                id="password"
                inputprops={{
                    classes: {
                        input: classes.textField,
                    },
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                margin="normal"
                placeholder={term('password')}
                type="password"
                fullWidth
            />
            <div className={classes.formButtons}>
                {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                        disabled={
                            email.length === 0 || password.length === 0
                        }
                        onClick={() => loginUser()}
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        {term('log_in')}
                    </Button>
                )}
                <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                >
                    {term('forgot_password')}
                </Button>
            </div>
        </>
    )
}

export default SignIn
