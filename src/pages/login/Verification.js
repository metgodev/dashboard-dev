import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
// styles
import useStyles from "./styles";
import term from "../../terms";
import Widget from "../../components/Widget/Widget";


function Verification() {
    let classes = useStyles();
    let navigate = useNavigate()

    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [code, setCode] = useState("");


    const verifyCode = async () => {

    }

    const resendCode = async () => {

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
                <div className={classes.formButtons}>
                    {isLoading ? (
                        <CircularProgress size={26} className={classes.loginLoader} />
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
                <div className={classes.formButtons}>
                    <Button
                        onClick={() => verifyCode()}
                        color="primary"
                        size="small"
                        fullWidth
                    >
                        {term('', "resend verification code")}
                    </Button>
                </div>
                <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                        {term('incorrect_verification_code')}
                    </Typography>
                </Fade>
            </Widget>
        </div>
    )
}

export default Verification
