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
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../../data/routes';
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
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState(null)
    const [final, setFinal] = useState(null)

    const signInWithOtp = async () => {
        if (otp === null || final === null)
            return;
        try {
            setIsLoading(true)
            const res = await final.confirm(otp)
            if (res) {
                const authenticate = await Auth(res.user.accessToken)
                if (authenticate.error) {
                    setIsLoading(false);
                } else {
                    let user = { v: authenticate._v, id: authenticate._id }
                    dispatch(set_user(user));
                    dispatch(set_user_details(authenticate))
                    navigate(BUSINESS_OWNER_ROUTES.BUSINESSES)
                    setIsLoading(false);
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const registerUser = async () => {
        setIsLoading(true)
        if (phoneNumber.length !== 10 || phoneNumber[0] !== '0' || phoneNumber[1] !== '5') {
            Toast(term('please_enter_a_valid_phone_number'))
            setIsLoading(false)
            return
        }
        try {
            const register = await loginWithPhoneNumber(phoneNumber.replace('0', '+972'))
            setFinal(register)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            if (e.code === "auth/too-many-requests") {
                Toast(term('too_many_requests'))
            }
            Toast()
        }
    }

    return (
        <div>
            <>
                <div
                    id="recaptcha-container"
                    class="justify-center flex"
                ></div>
                <Typography variant="h1" className={classes.greeting}>
                    {term('welcome')}
                </Typography>
                {final === null &&
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
                }
                {final !== null &&
                    <TextField
                        variant="outlined"
                        id="first name"
                        inputprops={{
                            classes: {
                                input: classes.textField,
                            },
                        }}
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        margin="normal"
                        placeholder={term("otp")}
                        fullWidth
                    />
                }
                <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                        <CircularProgress size={26} />
                    ) : (
                        <>
                            {final === null &&
                                <Button
                                    onClick={() => registerUser()}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.createAccountButton}
                                >
                                    {term('get_otp')}
                                </Button>
                            }
                            {final !== null &&
                                <Button
                                    onClick={() => signInWithOtp()}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.createAccountButton}
                                >
                                    {term('sign_in')}
                                </Button>
                            }
                        </>
                    )}
                </div>
            </ >
        </div >
    )
}

export default Register
