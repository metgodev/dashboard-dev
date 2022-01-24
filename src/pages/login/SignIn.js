import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
// styles
import useStyles from "./styles";
import term from "../../terms";
import { Auth } from "../../API/metro";
import { utf8_to_b64 } from "../../utils/enode";
import { useDispatch } from "react-redux";
import { set_user } from "../../REDUX/actions/main.actions";

function SignIn() {
    let classes = useStyles();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    // local
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const loginUser = async () => {
        setIsLoading(false)
        Auth(email, password).then((res) => {
            if (res.error) setError(true);
            else {
                let user = {
                    e: utf8_to_b64(res.email),
                    fn: utf8_to_b64(res.firstName),
                    ln: utf8_to_b64(res.lastName),
                    rn: utf8_to_b64(res.roles[0].roleName),
                    v: res.isVerified
                }
                dispatch(set_user(user))
                if (res.isVerified) navigate("/dashboard");
                else navigate("/verification");
                setIsLoading(false)
            }
        })
    }

    return (
        <>
            <Typography variant="h1" className={classes.greeting}>
                {term('metro_travel')}
            </Typography>
            <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                    {term('something_went_wrong')}
                </Typography>
            </Fade>
            <TextField
                variant="outlined"
                id="email"
                inputProps={{
                    classes: {
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
                variant="outlined"
                id="password"
                inputProps={{
                    classes: {
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
        </>
    )
}

export default SignIn
