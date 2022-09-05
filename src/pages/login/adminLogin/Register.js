import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import term from "../../../terms";
import { Auth } from '../../../API/metro';
import { useDispatch } from 'react-redux';
import { set_user } from '../../../REDUX/actions/main.actions';
import { registerUserWithEmailAndPassword } from '../../../API/firebase';
import { set_user_details } from '../../../REDUX/actions/user.actions'
// styles
import useStyles from "../styles";
import LISTENER from '../../../data/listener';
import { ROUTES } from '../../../data/routes';
import Toast from '../../../utils/useToast';
import ERRORS from '../../../data/errors';

function Register() {

    let dispatch = useDispatch()

    let navigate = useNavigate()
    let classes = useStyles();
    let [isLoading, setIsLoading] = useState(false);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const LISTENER_TYPE = LISTENER.TYPES.KEYDOWN
    const LISTENER_FUNCTION = (e) => {
        if (e.key === LISTENER.KEYS.ENTER && email.length !== 0 && password.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
            registerUser()
        }
    }

    useEffect(() => {
        document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        document.addEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        return () => {
            document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        }
    }, [email, password])


    const registerUser = async () => {
        if (password.length < 6) {
            Toast(ERRORS.SIX_CHARACTERS_PASSWORD)
            return
        }
        setIsLoading(true)
        registerUserWithEmailAndPassword(email, password).then(res => {
            if (res === undefined) {
                Toast(ERRORS.INVALID_EMAIL)
                setIsLoading(false);
                return
            }
            Auth(res.user.accessToken).then(res => {
                if (res.error) {
                    setIsLoading(false);
                } else {
                    let user = {
                        e: res.email,
                        v: res.isVerified,
                        id: res._id
                    }
                    dispatch(set_user(user));
                    dispatch(set_user_details(res))
                    navigate(ROUTES.DASHBOARD)
                    setIsLoading(false);
                }
            }).catch(e => {
                console.log('register', e)
                Toast()
            })
        }).catch(e => {
            console.log('register', e)
            Toast()
        })
    }

    return (
        <div>
            <>
                <Typography variant="h1" className={classes.greeting}>
                    {term('welcome')}
                </Typography>
                <Typography variant="h2" className={classes.subGreeting}>
                    {term('create_your_account')}
                </Typography>
                <TextField
                    variant="outlined"
                    id="first name"
                    inputprops={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    margin="normal"
                    placeholder={term("name")}
                    type="email"
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    id="last name"
                    inputprops={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    margin="normal"
                    placeholder={term("last_name")}
                    type="email"
                    fullWidth
                />
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
                    placeholder={term("email_address")}
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
                    placeholder={term("password")}
                    type={showPassword ? "text" : "password"}
                    helperText={term("password_must_be_at_least_6_characters_long_helper")}
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
                <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                        <CircularProgress size={26} />
                    ) : (
                        <Button
                            onClick={() => registerUser()}
                            disabled={
                                email.length === 0 ||
                                password.length === 0 ||
                                firstName.length === 0 ||
                                lastName.length === 0
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.createAccountButton}
                        >
                            {term('create_your_account')}
                        </Button>
                    )}
                </div>
            </ >
        </div >
    )
}

export default Register
