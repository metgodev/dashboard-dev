import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import term from "../../../terms";
import { useDispatch } from 'react-redux';
import { set_user } from '../../../REDUX/actions/main.actions';
import { loginWithPhoneNumber } from '../../../API/firebase';
import { set_user_details } from '../../../REDUX/actions/user.actions'
import { registerUserWithEmailAndPassword } from '../../../API/firebase';
import { Auth } from '../../../API/metro';
// styles
import useStyles from "../styles";
import LISTENER from '../../../data/listener';
import { BUSINESS_OWNER_ROUTES } from '../../../data/routes';
import Toast from '../../../utils/useToast';
import ERRORS from '../../../data/errors';
import ROLES from '../../../data/roles';
import client from '../../../API/metro'
import BACK_ROUTES from '../../../data/back_routes';

function Register() {

    let dispatch = useDispatch()

    let navigate = useNavigate()
    let classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const LISTENER_TYPE = LISTENER.TYPES.KEYDOWN
    const LISTENER_FUNCTION = (e) => {
        if (e.key === LISTENER.KEYS.ENTER && phoneNumber.length !== 0 && verifyPhoneNumber.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
            registerUser()
        }
    }

    useEffect(() => {
        document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        document.addEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        return () => {
            document.removeEventListener(LISTENER_TYPE, LISTENER_FUNCTION)
        }
    }, [phoneNumber, verifyPhoneNumber])

    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber.length !== 10 || phoneNumber[0] !== '0' || phoneNumber[1] !== '5') {
            Toast(term(ERRORS.INVALID_PHONE_NUMBER))
            return false
        } else {
            return '+972'.concat(phoneNumber.substring(1, phoneNumber.length))
        }
    }

    const checkValidityOfData = () => {
        if (phoneNumber !== verifyPhoneNumber) {
            Toast('phone_numbers_are_not_the_same')
            return false
        }
        if (phoneNumber.length !== 10) {
            Toast('please_enter_a_mobile_number_without_spaces_or_dashes')
            return false
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            Toast('please_enter_a_valid_email_address')
            return false
        }
        return true
    }

    const registerUser = async () => {
        if (checkValidityOfData()) {
            setIsLoading(true)
            try {
                const register = await registerUserWithEmailAndPassword(email, password)
                if (!register) {
                    Toast(ERRORS.INVALID_EMAIL)
                    setIsLoading(false);
                    return
                }
                else {
                    const authenticate = await Auth(register.user.accessToken)
                    if (authenticate) {
                        let user = {
                            v: authenticate.isVerified,
                            id: authenticate._id
                        }
                        await client.service(BACK_ROUTES.USER_ROLES).create({ userId: user.id, roleId: ROLES.BUSINESS_ROLE_ID })
                        await client.service(BACK_ROUTES.USERS).patch(user.id, { phoneNumber: phoneNumber })
                        const userDetails = await client.service(BACK_ROUTES.USERS).find({ query: { _id: user.id } })
                        dispatch(set_user(user));
                        dispatch(set_user_details(userDetails.data[0]))
                        navigate(BUSINESS_OWNER_ROUTES.DASHBOARD)
                        setIsLoading(false)
                    }
                }
            } catch (e) {
                setIsLoading(false)
                console.log(e)
                Toast()
            }
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
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    id="phone"
                    helperText={term("enter_phone_number_of_business_owner")}
                    inputprops={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder={term('phone_number')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    id="verifyPhone"
                    inputprops={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={verifyPhoneNumber}
                    onChange={e => setVerifyPhoneNumber(e.target.value)}
                    placeholder={term('verify_phone_number')}
                    margin="normal"
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
                    placeholder={term('email')}
                    margin="normal"
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
                                phoneNumber.length === 0 ||
                                verifyPhoneNumber.length === 0 ||
                                firstName.length === 0 ||
                                lastName.length === 0 ||
                                email.length === 0 ||
                                password.length < 6
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.createAccountButton}
                        >
                            {term('register')}
                        </Button>
                    )}
                </div>
            </ >
        </div >
    )
}

export default Register
