import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
import term from "../../terms";
import client, { Auth } from '../../API/metro';
import { useDispatch } from 'react-redux';
import { set_user } from '../../REDUX/actions/main.actions';
// styles
import useStyles from "./styles";
import { registerUserWithEmailAndPassword } from '../../API/firebase';

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
        if (password.length < 6) return setError(true)
        setIsLoading(true)
        registerUserWithEmailAndPassword(email, password).then(res => {
            Auth(res.user.accessToken).then(res => {
                if (res.error) {
                    setIsLoading(false);
                    setError(res.error)
                } else {
                    let user = {
                        e: res.email,
                        v: res.isVerified,
                        id: res._id
                    }
                    dispatch(set_user(user));
                    setIsLoading(false);
                }
            })
        })
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
                        {term('plase_make_sure_that_your_details_are_correct')}
                    </Typography>
                </Fade>
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
                    type="email"
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
                    type="email"
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
                    margin="normal"
                    placeholder={term("email_address")}
                    type="email"
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
                    type="password"
                    helperText={term("password_must_be_at_least_6_characters_long_helper")}
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
