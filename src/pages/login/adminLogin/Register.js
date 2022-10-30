import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, InputAdornment, IconButton } from "@material-ui/core";
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
import BACK_ROUTES from '../../../data/back_routes'
import client from '../../../API/metro'

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
        try {
            const register = await registerUserWithEmailAndPassword(email, password)
            if (!register) {
                Toast()
                setIsLoading(false);
                return
            }
            else {
                const authenticate = await Auth(register.user.accessToken)
                if (authenticate.error) {
                    setIsLoading(false);
                } else {
                    const userDetails = await client.service(BACK_ROUTES.USERS).patch(authenticate._id, { firstName: firstName, lastName: lastName })
                    let user = { e: authenticate.email, v: authenticate.isVerified, id: authenticate._id }
                    dispatch(set_user(user));
                    dispatch(set_user_details(userDetails.data))
                    navigate(ROUTES.DASHBOARD)
                    setIsLoading(false);
                }
            }
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                Toast(term('email_is_invalid_or_taken'))
            } else {
                Toast()
            }
            setIsLoading(false);
        }
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
