import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
import { useSelector } from "react-redux";
import term from "../../terms";
import { client } from "../../API/metro";
// styles
import useStyles from "./styles";
import Widget from "../../components/Widget/Widget";
import { b64_to_utf8 } from "../../utils/enode";


function Verification() {
    let classes = useStyles();
    let navigate = useNavigate()
    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState({ err: false });
    let [code, setCode] = useState("");
    let [msg, setMsg] = useState({ ismsg: false })
    //global 
    const { user } = useSelector(s => s.mainRememberReducer)

    useLayoutEffect(() => {
        console.log(user.v)
        if (b64_to_utf8(user.v)) navigate("/dashboard")
    }, [])

    const verifyCode = async () => {
        setIsLoading(true)
        let res = await client.service('authmanagement').create({
            action: "verifySignupShort",
            value: { user: { email: b64_to_utf8(user.e) }, token: code }
        })
        if (res.error) setError({ err: true, msg: res.message })
        else if (res.isVerified) {
            setIsLoading(false)
            navigate("/dashboard");
        }
    }

    const resendCode = async () => {
        setIsLoading(true)
        let res = await client.service('authmanagement').create({
            action: "resendVerifySignup",
            value: { email: b64_to_utf8(user.e) }
        })
        if (res.error) setError({ err: true, msg: res.message })
        else {
            setIsLoading(false)
            setMsg({ ismsg: true, msg: res.email })
        }
    }

    return (
        <div className={classes.VerificationContainer}>
            <Widget noBodyPadding disableWidgetMenu bodyClass={classes.VerificationWrapper}>
                <Typography variant="h1" className={classes.greeting}>
                    {term('', 'Verification Page')}
                </Typography>
                <Typography variant="h6" className={classes.greeting}>
                    {term('', 'please enter your verification code')}
                </Typography>
                <TextField
                    variant="outlined"
                    id="verification"
                    InputProps={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    margin="normal"
                    placeholder={term('', 'verify code')}
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
                            {term('', 'send')}
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
                        {term('', "resend verification code")}
                    </Button>
                </div>
                <Fade in={error.err}>
                    <Typography color="secondary" className={classes.errorMessage}>
                        {term('incorrect_verification_code') + error.msg}
                    </Typography>
                </Fade>
                <Fade in={msg.ismsg}>
                    <Typography color="secondary" className={classes.errorMessage}>
                        {term('', 'email has been sent to') + msg.msg}
                    </Typography>
                </Fade>
            </Widget>
        </div>
    )
}

export default Verification
