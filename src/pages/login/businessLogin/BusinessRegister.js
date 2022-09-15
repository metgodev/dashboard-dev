import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import term from "../../../terms";
import { Auth } from '../../../API/metro';
import { useDispatch } from 'react-redux';
import { set_user } from '../../../REDUX/actions/main.actions';
import { loginWithPhoneNumber } from '../../../API/firebase';
import { set_user_details } from '../../../REDUX/actions/user.actions'
// styles
import useStyles from "../styles";
import LISTENER from '../../../data/listener';
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../../data/routes';
import Toast from '../../../utils/useToast';
import ERRORS from '../../../data/errors';
import ROLES from '../../../data/roles';
import client from '../../../API/metro'
import BACK_ROUTES from '../../../data/back_routes';
import { RecaptchaVerifier } from 'firebase/auth';

function Register() {

    let dispatch = useDispatch()

    let navigate = useNavigate()
    let classes = useStyles();

    let [isLoading, setIsLoading] = useState(false);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");
    const [response, setResponse] = useState(null)
    let [confirmationCode, setConfirmationCode] = useState(null);

    const LISTENER_TYPE = LISTENER.TYPES.KEYDOWN
    const LISTENER_FUNCTION = (e) => {
        if (e.key === LISTENER.KEYS.ENTER && phoneNumber.length !== 0 && verifyPhoneNumber.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
            sendVerificationCode()
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

    const sendVerificationCode = async () => {
        if (phoneNumber !== verifyPhoneNumber) {
            Toast(term(ERRORS.PHONE_NUMBERS_ARE_NOT_THE_SAME))
            return
        }
        setIsLoading(true)
        const formattedPhoneNumber = formatPhoneNumber(phoneNumber)
        if (!formattedPhoneNumber) {
            setIsLoading(false)
            return
        }
        try {
            const firstRes = await loginWithPhoneNumber(formattedPhoneNumber)
            if (firstRes === undefined) {
                Toast(term(ERRORS.INVALID_PHONE_NUMBER))
                setIsLoading(false);
            } else {
                setResponse(firstRes)
                setConfirmationCode("")
                setIsLoading(false);
            }
        } catch (e) {
            console.log('register', e)
            setIsLoading(false);
            Toast()
        }
    }

    const registerUser = async () => {
        setIsLoading(true)
        try {
            const secondRes = await response.confirm(confirmationCode)
            if (!secondRes) {
                Toast()
                setIsLoading(false)
                return
            }
            let user = {
                v: secondRes.isVerified,
                id: secondRes._id
            }
            await client.service(BACK_ROUTES.USER_ROLES).create({ userId: user.id, roleId: ROLES.BUSINESS_ROLE_ID })
            const userDetails = await client.service(BACK_ROUTES.USERS).find({ query: { _id: user.id } })
            dispatch(set_user(user));
            dispatch(set_user_details(userDetails.data[0]))
            navigate(BUSINESS_OWNER_ROUTES.DASHBOARD)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(e)
            Toast()
        }
    }

    return (
        <div>
            <>
                <div
                    id="recaptcha-container"
                >
                </div>
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
                {confirmationCode !== null && < TextField
                    variant="outlined"
                    id="confirmationCode"
                    inputprops={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={confirmationCode}
                    onChange={e => setConfirmationCode(e.target.value)}
                    placeholder={term('confirmation_code')}
                    margin="normal"
                    fullWidth
                />}
                <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                        <CircularProgress size={26} />
                    ) : (
                        <Button
                            onClick={confirmationCode === null ? () => sendVerificationCode() : () => registerUser()}
                            disabled={
                                phoneNumber.length === 0 ||
                                verifyPhoneNumber.length === 0 ||
                                firstName.length === 0 ||
                                lastName.length === 0
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.createAccountButton}
                        >
                            {confirmationCode === null ? term('send_verification_code') : term('send')}
                        </Button>
                    )}
                </div>
            </ >
        </div >
    )
}

export default Register
