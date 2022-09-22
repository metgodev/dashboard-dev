import React, { useLayoutEffect } from 'react';
//Material UI
import { Box } from '@material-ui/core';
//Redux
import { useDispatch } from 'react-redux';
import { set_user_details } from '../REDUX/actions/user.actions';
//Styles
import useStyles from "./styles";
//Components
import Main from '../components/AdjustHelpers/Main';
import { Toaster } from 'react-hot-toast';
//Api
import { reAuth } from '../API/metro';
//Routes
import UseGetRoutes from './UseGetRoutes'
//Header and sidebar
import UseGetHeaderAndSideBar from './UseGetHeaderAndSideBar'
//Navigation
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../data/routes';
import getInternetStatus from '../utils/checkInternetStatus';
import NetworkError from '../pages/networkError/NetworkError';

const Root = () => {

    let classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const routes = UseGetRoutes()
    const headerAndSideBar = UseGetHeaderAndSideBar()

    useLayoutEffect(() => {
        (async () => {
            try {
                if (window.localStorage.getItem('metgo-jwt') === null) {
                    dispatch(set_user_details({}))
                    navigate(ROUTES.LOGIN)
                }
                const user = await reAuth()
                dispatch(set_user_details(user))
            } catch (e) {
                console.log('root', e)
            }
        })()
    }, [])

    return (
        <Box className={classes.Router}>
            <Toaster position={'bottom-center'} />
            <Main >
                {getInternetStatus() && headerAndSideBar}
                {getInternetStatus() ? routes : <NetworkError />}
            </Main>
        </Box >
    );
}

export default Root;