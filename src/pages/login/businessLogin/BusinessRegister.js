import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, IconButton } from "@material-ui/core";
import term from "../../../terms";
import { useDispatch } from 'react-redux';
import { set_user } from '../../../REDUX/actions/main.actions';
import { loginWithPhoneNumber } from '../../../API/firebase';
import { set_user_details } from '../../../REDUX/actions/user.actions'
import { Auth } from '../../../API/metro';
// styles
import useStyles from "../styles";
import { BUSINESS_OWNER_ROUTES } from '../../../data/routes';
import Toast from '../../../utils/useToast';
import { Box, Modal, Button, TextField } from '@mui/material';
import getWindowSize from '../../../hooks/useGetWindowSize'
import BACK_ROUTES from '../../../data/back_routes';
import client from '../../../API/metro'

function Register() {

    let dispatch = useDispatch()

    let navigate = useNavigate()
    let classes = useStyles();
    const { width } = getWindowSize()

    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState(null)
    const [final, setFinal] = useState(null)
    const [enterEmailAndNameModal, setEnterEmailAndNameModal] = useState(false)
    const [email, setEmail] = useState(null)
    const [otpResult, setOtpResult] = useState(null)

    const signInWithOtp = async () => {
        if (otp === null || final === null)
            return;
        try {
            setIsLoading(true)
            const res = await final.confirm(otp)
            setOtpResult(res)
            if (res) {
                const authenticate = await Auth(res.user.accessToken)
                if (authenticate.error) {
                    setIsLoading(false);
                } else {
                    let user = { v: authenticate._v, id: authenticate._id }
                    dispatch(set_user(user));
                    dispatch(set_user_details(authenticate))
                    if (authenticate.email !== undefined) {
                        navigate(BUSINESS_OWNER_ROUTES.BUSINESSES)
                    } else {
                        setEnterEmailAndNameModal(true)
                    }
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

    const buttonClicked = async () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            const authenticate = await Auth(otpResult.user.accessToken)
            const updateEmail = await client.service(BACK_ROUTES.USERS).patch(authenticate._id, { email: email })
            if (authenticate.error || updateEmail.error) {
                setIsLoading(false);
            } else {
                let user = { v: authenticate._v, id: authenticate._id }
                dispatch(set_user(user));
                dispatch(set_user_details(updateEmail))
                navigate(BUSINESS_OWNER_ROUTES.BUSINESSES)
                setIsLoading(false);
            }
        } else {
            Toast(term('auth_invalid_email'))
        }
    }

    return (
        <div>
            <>
                <Modal
                    open={enterEmailAndNameModal}
                    onClose={() => {
                        setEnterEmailAndNameModal(false)
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ borderRadius: '10px', flexDirection: 'column', paddingTop: '40px', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: width > 1280 ? '40vw' : '95vw', height: width > 600 ? '70%' : '90%', backgroundColor: 'white' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{term('details')}</p>
                            <Box style={{ gap: 10, width: '100%', height: '100%', padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', }}>
                                <TextField onChange={(e) => {
                                    setEmail(e.target.value)
                                }} id="outlined-basic" label={term('email')} variant="outlined" value={email} />
                                <Button variant='contained' onClick={() => buttonClicked()}>{term('save')}</Button>
                            </Box>
                        </div>
                    </Box >
                </Modal >
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
