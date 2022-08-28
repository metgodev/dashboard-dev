import React, { useLayoutEffect, useState, useCallback } from 'react';
//MUI
import { Routes, Route, useLocation, Navigate, } from 'react-router-dom'
import { Box } from '@material-ui/core';
//Pages
import Main from '../components/AdjustHelpers/Main';
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';
import Verification from '../pages/login/Verification';
import Dashboard from '../pages/dashboard/Dashboard';
import useStyles from "./styles";
import Businesses from '../pages/businesses/Businesses';
import LocalCampaigns from '../pages/localCampains/LocalCampaigns';
import Events from '../pages/events/Events';
import PointsOfInterest from '../pages/points/PointsOfInterest';
import Tracks from '../pages/tracks/Tracks';
import Voucher from '../pages/voucher/Voucher';
import UsersTable from '../pages/userstable/UsersTable';
import Maps from '../pages/maps/Maps';
import Support from '../pages/support/Support';
import FAQ from '../pages/FAQ/FAQ';
import Products from '../pages/products/Products'
//Admin pages
import AuthorityMng from '../pages/admin/AuthorityMng';
import TagCategoriesMng from '../pages/admin/TagCategoriesMng';
//Helper
import { Protecte, getHeaderAndSidebar } from './rootHelper.js';
import ROUTES from '../data/routes';
import term from '../terms';
//Components
import { Toaster } from 'react-hot-toast';
//Redux
import { set_user_details } from '../REDUX/actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
//API
import { reAuth } from '../API/metro';
//Hooks
import GetPermissions from '../hooks/GetPermissions'
import { toast } from 'react-hot-toast';

const Root = () => {

    //Styles
    let classes = useStyles();
    //Global state
    const dispatch = useDispatch()
    let location = useLocation();
    const userDetails = useSelector(s => s.userReducer.userDetails)
    //Permission management
    const permissions = GetPermissions(userDetails ? userDetails : null)

    useLayoutEffect(() => {
        (async () => {
            try {
                const user = await reAuth()
                dispatch(set_user_details(user))
            } catch (e) {
                console.log('root', e)
                authError()
            }
        })()
    }, [])

    const HeaderAndSideBar = useCallback(getHeaderAndSidebar(location), [userDetails, location])
    const authError = () => toast(term('something_went_wrong'))

    return (
        <Box className={classes.Router}>
            <Toaster position={'bottom-center'} />
            <Main >
                {Boolean(Object.keys(userDetails).length) && HeaderAndSideBar}
                <Routes>
                    <Route exact path={ROUTES.ROOT} element={<Protecte auth={permissions.main}><Navigate to={ROUTES.DASHBOARD} /></Protecte>} />
                    <Route exact path={ROUTES.DASHBOARD} element={<Protecte auth={permissions.dashboard}><Dashboard /></Protecte>} />
                    {/* <Route exact path={ROUTES.VERIFICATION} element={< Protecte auth={permissions.verification}><Verification /></Protecte>} /> */}
                    <Route exact path={ROUTES.BUSINESSES} element={<Protecte auth={permissions.business}><Businesses /></Protecte>} />
                    <Route exact path={ROUTES.EVENTS} element={<Protecte auth={permissions.events}><Events /></ Protecte >} />
                    <Route exact path={ROUTES.POINTS} element={<Protecte auth={permissions.locations}><PointsOfInterest /></Protecte>} />
                    <Route exact path={ROUTES.TRACKS} element={<Protecte auth={permissions.routes}><Tracks /></Protecte>} />
                    <Route exact path={ROUTES.PRODUCTS} element={<Protecte auth={permissions.products}><Products /></Protecte>} />
                    <Route exact path={ROUTES.VOUCHER} element={<Protecte auth={permissions.vouchers}><Voucher /></Protecte>} />
                    <Route exact path={ROUTES.USERS} element={<Protecte auth={permissions.users}><UsersTable /></Protecte>} />
                    <Route exact path={ROUTES.CAMPAIGN} element={<Protecte auth={permissions.campaign}><LocalCampaigns /></Protecte>} />
                    <Route exact path={ROUTES.MAP} element={<Protecte auth={permissions.map}><Maps /></Protecte>} />
                    <Route exact path={ROUTES.SUPPORT} element={<Protecte auth={permissions.support}><Support /></Protecte>} />
                    <Route exact path={ROUTES.FAQ} element={<Protecte auth={permissions.faq}><FAQ /></Protecte>} />
                    <Route exact path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.ERROR} element={<Protecte auth={permissions.error}><Error /></Protecte>} />
                    {/* Admin sections */}
                    <Route exact path={ROUTES.AUTHORITY} element={<Protecte auth={permissions.authority}><AuthorityMng /></Protecte>} />
                    <Route exact path={ROUTES.TAG_CATEGORIES} element={<Protecte auth={permissions.tagcategories}><TagCategoriesMng /></Protecte>} />
                    <Route exact path={ROUTES.USERS} element={<Protecte auth={permissions.users}><UsersTable /></Protecte>} />
                </Routes>
            </Main>
        </Box >
    );
}

export default Root;