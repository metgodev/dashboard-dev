import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// styles
import useStyles from "../styles";
import term from "../../../terms";
//Server
import { Auth } from "../../../API/metro";
import { loginWithEmailAndPassword } from "../../../API/firebase";
//Redux
import { useDispatch } from "react-redux";
import { set_user } from "../../../REDUX/actions/main.actions";
import { set_user_details } from '../../../REDUX/actions/user.actions'
import LISTENER from "../../../data/listener";
import { BUSINESS_OWNER_ROUTES, ROUTES } from "../../../data/routes";
import Toast from "../../../utils/useToast";
import ERRORS from "../../../data/errors";
import MESSAGES from '../../../data/messages'
import { resetPassword } from '../../../API/firebase'

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
                Toast(ERRORS.WRONG_DETAILS)
                return
            }
            Auth(res.user.accessToken).then(res => {
                if (res.error) {
                    setError(res.error)
                    Toast(ERRORS.WRONG_DETAILS)
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
                    navigate(BUSINESS_OWNER_ROUTES.DASHBOARD)
                    setIsLoading(false);
                }
            }).catch((e) => {
                console.log('signin', e)
                Toast()
            })
        }).catch((e) => {
            console.log('signin', e)
            Toast()
        })
    }

    useEffect(() => {
        document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        document.addEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        return () => {
            document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        }
    }, [email, password])

    const handleResetPassword = async () => {
        const res = await resetPassword(email)
        if (res) {
            Toast(MESSAGES.PASSWORD_RESET_SENT)
        } else {
            Toast()
        }
    }

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
                    onClick={() => handleResetPassword()}
                >
                    {term('forgot_password')}
                </Button>
            </div>
        </>
    )
}

export default SignIn