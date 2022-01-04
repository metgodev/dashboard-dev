import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
// styles
import useStyles from "./styles";
import term from "../../terms";
import { Auth } from "../../API/metro";


function SignIn() {
    let classes = useStyles();
    let navigate = useNavigate()

    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const loginUser = async () => {
        setIsLoading(false)
        Auth(email, password).then((res) => {
            console.log(res)
            if (res.error) setError(true);
            else {
                navigate("/dashboard")
                setIsLoading(false)
            }
        })
    }

    return (
        <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
                {term('metro_travel')}
            </Typography>
            <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                    {term('something_went_wrong')}
                </Typography>
            </Fade>
            <TextField
                id="email"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
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
                id="password"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                margin="normal"
                placeholder={term('password')}
                type="password"
                fullWidth
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
                >
                    {term('forgot_password')}
                </Button>
            </div>
        </React.Fragment>
    )
}

export default SignIn
