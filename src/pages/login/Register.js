import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
import term from "../../terms";
import { Auth, client } from '../../API/metro';
import { useDispatch } from 'react-redux';
import { utf8_to_b64 } from '../../utils/enode';
import { set_user } from '../../REDUX/actions/main.actions';
// styles
import useStyles from "./styles";



function Register() {
    let dispatch = useDispatch()

    let navigate = useNavigate()
    let classes = useStyles();
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const registerUser = async () => {
        setIsLoading(true)
        let res = await client.service('users').create({ email, password, firstName, lastName })
        if (res.error) setError(res.error)
        else {
            Auth(email, password).then((res) => {
                if (res.error) setError(true);
                else {
                    let user = {
                        e: utf8_to_b64(res.email),
                        fn: utf8_to_b64(res.firstName),
                        ln: utf8_to_b64(res.lastName),
                        rn: utf8_to_b64(res.roles.roleName),
                        v: utf8_to_b64(res.isVerified)
                    }
                    dispatch(set_user(user))
                    if (res.isVerified) navigate("/dashboard");
                    else navigate("/verification");
                    setIsLoading(false)
                }
            })
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
                <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                        {term('something_went_wrong')}
                    </Typography>
                </Fade>
                <TextField
                    variant="outlined"
                    id="first name"
                    InputProps={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    margin="normal"
                    placeholder="שם"
                    type="email"
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    id="last name"
                    InputProps={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    margin="normal"
                    placeholder="שם משפחה"
                    type="email"
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    id="email"
                    InputProps={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    margin="normal"
                    placeholder="כתובת אימייל"
                    type="email"
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    id="password"
                    InputProps={{
                        classes: {
                            input: classes.textField,
                        },
                    }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    margin="normal"
                    placeholder="סיסמה"
                    type="password"
                    fullWidth
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
