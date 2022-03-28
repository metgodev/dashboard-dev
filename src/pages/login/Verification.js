import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
import { set_user } from "../../REDUX/actions/main.actions";
import { useSelector, useDispatch } from "react-redux";
import client, { isVerified } from "../../API/metro";
import Widget from "../../components/Widget/Widget";
import { useNavigate } from "react-router-dom";
import term from "../../terms";
// styles
import useStyles from "./styles";


function Verification() {
    let verified = isVerified();
    let classes = useStyles();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState({ err: false });
    let [code, setCode] = useState('');
    let [msg, setMsg] = useState({ ismsg: false })
    //global 
    const { user } = useSelector(s => s.mainRememberReducer)

    useEffect(() => {
        if (verified) navigate("/dashboard")
    }, [])

    const verifyCode = async () => {
        setIsLoading(true)
        let res = await client.service('authmanagement').create({
            action: "verifySignupShort",
            value: { user: { email: user.e }, token: code }
        })
        if (res.error) {
            setError({ err: true, msg: res.message })
            setIsLoading(false)
            setCode('')
        }
        else {
            setIsLoading(false)
            setMsg({ ismsg: true, msg: res.email })
            dispatch(set_user({ ...user, v: res.isVerified }))
            if (res.isVerified) navigate("/dashboard")
        }
    }

    const resendCode = async () => {
        setIsLoading(true)
        let res = await client.service('authmanagement').create({
            action: "resendVerifySignup",
            value: { email: user.e }
        })
        if (res.error) {
            setError({ err: true, msg: res.message })
            setIsLoading(false)
            setCode('')
        }
        else {
            setIsLoading(false)
            setMsg({ ismsg: true, msg: res.email })
            dispatch(set_user({ ...user, v: res.isVerified }))
            if (res.isVerified) navigate("/dashboard")
        }
    }

    return (
        <div className={classes.VerificationContainer}>
            <Widget noBodyPadding disableWidgetMenu bodyClass={classes.VerificationWrapper}>
                <Typography variant="h1" className={classes.greeting}>
                    {term('verification_page')}
                </Typography>
                <Typography variant="subtitle2" className={classes.greeting}>
                    {term(`an_email_has_been_sent_to`) + `${user.e}`}
                </Typography>
                <Typography variant="h6" className={classes.greeting}>
                    {term('please_enter_your_verification_code')}
                </Typography>
                <TextField
                    variant="outlined"
                    id="verification"
                    inputprops={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    margin="normal"
                    placeholder={term('verify_code')}
                    type="verification"
                    fullWidth
                />
                <div className={classes.VerificationLoader}>
                    {isLoading ? (
                        <CircularProgress size={26} className={classes.VerificationLoader} />
                    ) : (
                        <Button
                            disabled={code.length === 0}
                            onClick={() => verifyCode()}
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            {term('send')}
                        </Button>
                    )}
                </div>
                <div className={classes.VerificationLoader}>
                    <Button
                        onClick={() => resendCode()}
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        {term("resend_verification_code")}
                    </Button>
                </div>
                <Fade in={error.err}>
                    <Typography color="secondary" className={classes.errorMessage}>
                        {term('incorrect_verification_code') + error.msg}
                    </Typography>
                </Fade>
                <Fade in={msg.ismsg}>
                    <Typography color="textPrimary" className={classes.errorMessage}>
                        {term('', 'verified') + msg.msg}
                    </Typography>
                </Fade>
            </Widget>
        </div>
    )
}

export default Verification
