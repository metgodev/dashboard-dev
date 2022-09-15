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

const Root = () => {

    let classes = useStyles();
    const dispatch = useDispatch()

    const routes = UseGetRoutes()
    const headerAndSideBar = UseGetHeaderAndSideBar()

    useLayoutEffect(() => {
        (async () => {
            try {
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
                {headerAndSideBar}
                {routes}
            </Main>
        </Box >
    );
}

export default Root;