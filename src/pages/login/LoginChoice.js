import React from 'react'
import useStyles from './styles'
import logo from "../../Assets/images/metroLogo.png";
import term from '../../terms';
import { Box, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../data/routes';

function LoginChoice() {

    const classes = useStyles()
    const navigate = useNavigate()

    const admin = () => {
        navigate(ROUTES.LOGIN)
    }

    const businessOwner = () => {
        navigate(BUSINESS_OWNER_ROUTES.LOGIN)
    }

    return (
        <Box className={classes.loginChoiceContainer}>
            <div className={classes.loginChoiceGraphicsContainer}>
                <img src={logo} alt="logo" className={classes.logotypeImage} />
                <Typography className={classes.logotypeText}>{term("met_go")}</Typography>
            </div>
            <div className={classes.loginChoceButtonsContainer}>
                <Button variant='contained' onClick={() => admin()}>{term('metro_admin')}</Button>
                <Button variant='contained' onClick={() => businessOwner()}>{term("metro_business_owner")}</Button>
            </div>
        </Box>

    )
}

export default LoginChoice