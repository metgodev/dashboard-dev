import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import toast from 'react-hot-toast';
// styles
import useStyles from "./styles";
import term from "../../terms";
//Server
import { Auth } from "../../API/metro";
import { loginWithEmailAndPassword } from "../../API/firebase";
//Redux
import { useDispatch } from "react-redux";
import { set_user } from "../../REDUX/actions/main.actions";
import { set_user_details } from '../../REDUX/actions/user.actions'
import LISTENER from "../../data/listener";
import ROUTES from "../../data/routes";

function SignIn() {
    let classes = useStyles();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const LISTENER_TYPE = LISTENER.TYPES.KEYDOWN
    const LISTENER_FUNCTION = (e) => {
        if (e.key === LISTENER.KEYS.ENTER && email.length !== 0 && password.length !== 0) {
            loginUser()
        }
    }

    const loginUser = async () => {
        setIsLoading(true)
        window.localStorage.clear()
        loginWithEmailAndPassword(email, password).then(res => {
            if (!res?.user) {
                setIsLoading(false)
                wrongCredentialsToast()
                return
            }
            Auth(res.user.accessToken).then(res => {
                if (res.error) {
                    setError(res.error)
                    wrongCredentialsToast()
                } else {
                    let userDetails = {
                        e: res.email,
                        fn: term('welcome_guest'),
                        ln: '',
                        v: res.isVerified,
                        id: res._id
                    }
                    dispatch(set_user(userDetails));
                    dispatch(set_user_details(res))
                    navigate(ROUTES.DASHBOARD)
                    setIsLoading(false);
                }
            }).catch((e) => {
                console.log('signin', e)
                errorToast()
            })
        }).catch((e) => {
            console.log('signin', e)
            errorToast()
        })
    }

    useEffect(() => {
        document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        document.addEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        return () => {
            document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        }
    }, [email, password])

    const wrongCredentialsToast = () => toast(term("plase_make_sure_that_your_details_are_correct"));
    const errorToast = () => toast(term("something_went_wrong"));

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
                type={showPassword ? "text" : "password"}
                fullWidth
                InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
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
