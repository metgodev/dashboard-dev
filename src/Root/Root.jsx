import React, { useLayoutEffect, useCallback } from 'react';
//MUI
import { Routes, Route, useLocation, Navigate, } from 'react-router-dom'
import { Box, CircularProgress } from '@material-ui/core';
//Pages
import Main from '../components/AdjustHelpers/Main';
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';
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
import Calendar from '../pages/calendar/Calendar'
//Admin pages
import AuthorityMng from '../pages/admin/AuthorityMng';
import TagCategoriesMng from '../pages/admin/TagCategoriesMng';
//Helper
import { Protecte, getHeaderAndSidebar } from './rootHelper.js';
import { ROUTES, BUSINESS_OWNER_ROUTES } from '../data/routes';
//Components
import { Toaster } from 'react-hot-toast';
//Redux
import { set_user_details } from '../REDUX/actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
//API
import { reAuth } from '../API/metro';
//Hooks
import GetPermissions from '../hooks/GetPermissions'
import ROLES from '../data/roles';
import Profile from '../pages/profile/Profile';

const Root = () => {
    //Styles
    let classes = useStyles();
    //Global state
    const dispatch = useDispatch()
    let location = useLocation();
    //User details
    const userDetails = useSelector(s => s.userReducer.userDetails)
    const user = useSelector(s => s.mainRememberReducer.user)
    //Permission management
    const permissions = GetPermissions(userDetails)

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

    const HeaderAndSideBar = useCallback(getHeaderAndSidebar(location), [userDetails, location, user])

    const getRoutes = useCallback(() => {
        if (Object.keys(userDetails).length === 0) {
            return (
                <Routes>
                    <Route exact path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} />} />
                    <Route exact path={BUSINESS_OWNER_ROUTES.LOGIN} element={<Login />} />
                    <Route exact path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.ERROR} element={<Box style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress size={50} /></Box>} />
                </Routes>
            )
        }
        else if (userDetails.roles.length === 1 && userDetails.roles[0].roleName === ROLES.MEMBER) {
            return (
                <Routes>
                    <Route exact path={ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Navigate to={ROUTES.DASHBOARD} /></Protecte>} />
                    <Route exact path={ROUTES.DASHBOARD} element={<Protecte auth={permissions.dashboard} loggedIn={user}><Dashboard /></Protecte>} />
                    <Route exact path={ROUTES.MAP} element={<Protecte auth={permissions.map} loggedIn={user}><Maps /></Protecte>} />
                    <Route exact path={ROUTES.SUPPORT} element={<Protecte auth={permissions.support} loggedIn={user}><Support /></Protecte>} />
                    <Route exact path={ROUTES.FAQ} element={<Protecte auth={permissions.faq} loggedIn={user}><FAQ /></Protecte>} />
                    <Route exact path={ROUTES.LOGIN} element={<Login />} />
                    <Route exact path={ROUTES.USERS} element={<Protecte auth={permissions.users} loggedIn={user}><UsersTable /></Protecte>} />
                    <Route path={ROUTES.ERROR} element={<Protecte auth={permissions.error} loggedIn={user}><Error /></Protecte>} />
                    <Route exact path={ROUTES.PROFILE} element={<Protecte auth={permissions.profile} loggedIn={user}><Profile /></Protecte>} />
                </Routes>
            )
        }
        else if (userDetails.roles.length === 2) {
            switch (userDetails.roles[1].roleName) {
                case ROLES.BUSINESS_OWNER:
                    return (
                        <Routes>
                            <Route exact path={BUSINESS_OWNER_ROUTES.LOGIN} element={<Login />} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Navigate to={BUSINESS_OWNER_ROUTES.DASHBOARD} /></Protecte>} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.DASHBOARD} element={<Protecte auth={permissions.dashboard} loggedIn={user}><Dashboard /></Protecte>} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.BUSINESSES} element={<Protecte auth={permissions.business} loggedIn={user}><Businesses /></Protecte>} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.EVENTS} element={<Protecte auth={permissions.events} loggedIn={user}><Events /></ Protecte >} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.MAP} element={<Protecte auth={permissions.map} loggedIn={user}><Maps /></Protecte>} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.SUPPORT} element={<Protecte auth={permissions.support} loggedIn={user}><Support /></Protecte>} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.FAQ} element={<Protecte auth={permissions.faq} loggedIn={user}><FAQ /></Protecte>} />
                            <Route exact path={BUSINESS_OWNER_ROUTES.PROFILE} element={<Protecte auth={permissions.profile} loggedIn={user}><Profile /></Protecte>} />
                        </Routes>
                    )
                case ROLES.SUPER_ADMIN:
                    return (
                        <Routes>
                            <Route exact path={ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Navigate to={ROUTES.DASHBOARD} /></Protecte>} />
                            <Route exact path={ROUTES.DASHBOARD} element={<Protecte auth={permissions.dashboard} loggedIn={user}><Dashboard /></Protecte>} />
                            <Route exact path={ROUTES.PROFILE} element={<Protecte auth={permissions.profile} loggedIn={user}><Profile /></Protecte>} />
                            <Route exact path={ROUTES.BUSINESSES} element={<Protecte auth={permissions.business} loggedIn={user}><Businesses /></Protecte>} />
                            <Route exact path={ROUTES.EVENTS} element={<Protecte auth={permissions.events} loggedIn={user}><Events /></ Protecte >} />
                            <Route exact path={ROUTES.POINTS} element={<Protecte auth={permissions.locations} loggedIn={user}><PointsOfInterest /></Protecte>} />
                            <Route exact path={ROUTES.TRACKS} element={<Protecte auth={permissions.routes} loggedIn={user}><Tracks /></Protecte>} />
                            <Route exact path={ROUTES.PRODUCTS} element={<Protecte auth={permissions.products} loggedIn={user}><Products /></Protecte>} />
                            <Route exact path={ROUTES.VOUCHER} element={<Protecte auth={permissions.vouchers} loggedIn={user}><Voucher /></Protecte>} />
                            <Route exact path={ROUTES.CALENDAR} element={<Protecte auth={permissions.calendar} loggedIn={user}><Calendar /></Protecte>} />
                            <Route exact path={ROUTES.CAMPAIGN} element={<Protecte auth={permissions.campaign} loggedIn={user}><LocalCampaigns /></Protecte>} />
                            <Route exact path={ROUTES.MAP} element={<Protecte auth={permissions.map} loggedIn={user}><Maps /></Protecte>} />
                            <Route exact path={ROUTES.SUPPORT} element={<Protecte auth={permissions.support} loggedIn={user}><Support /></Protecte>} />
                            <Route exact path={ROUTES.FAQ} element={<Protecte auth={permissions.faq} loggedIn={user}><FAQ /></Protecte>} />
                            <Route exact path={ROUTES.LOGIN} element={<Login />} />
                            <Route path={ROUTES.ERROR} element={<Protecte auth={permissions.error} loggedIn={user}><Error /></Protecte>} />
                            {/* Admin sections */}
                            <Route exact path={ROUTES.AUTHORITY} element={<Protecte auth={permissions.authority} loggedIn={user}><AuthorityMng /></Protecte>} />
                            <Route exact path={ROUTES.TAG_CATEGORIES} element={<Protecte auth={permissions.tagcategories} loggedIn={user}><TagCategoriesMng /></Protecte>} />
                            <Route exact path={ROUTES.USERS} element={<Protecte auth={permissions.users} loggedIn={user}><UsersTable /></Protecte>} />
                        </Routes>
                    )
                case ROLES.ADMIN:
                    return (
                        <Routes>
                            <Route exact path={ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Navigate to={ROUTES.DASHBOARD} /></Protecte>} />
                            <Route exact path={ROUTES.DASHBOARD} element={<Protecte auth={permissions.dashboard} loggedIn={user}><Dashboard /></Protecte>} />
                            <Route exact path={ROUTES.PROFILE} element={<Protecte auth={permissions.profile} loggedIn={user}><Profile /></Protecte>} />
                            <Route exact path={ROUTES.BUSINESSES} element={<Protecte auth={permissions.business} loggedIn={user}><Businesses /></Protecte>} />
                            <Route exact path={ROUTES.EVENTS} element={<Protecte auth={permissions.events} loggedIn={user}><Events /></ Protecte >} />
                            <Route exact path={ROUTES.POINTS} element={<Protecte auth={permissions.locations} loggedIn={user}><PointsOfInterest /></Protecte>} />
                            <Route exact path={ROUTES.TRACKS} element={<Protecte auth={permissions.routes} loggedIn={user}><Tracks /></Protecte>} />
                            <Route exact path={ROUTES.PRODUCTS} element={<Protecte auth={permissions.products} loggedIn={user}><Products /></Protecte>} />
                            <Route exact path={ROUTES.VOUCHER} element={<Protecte auth={permissions.vouchers} loggedIn={user}><Voucher /></Protecte>} />
                            <Route exact path={ROUTES.CALENDAR} element={<Protecte auth={permissions.calendar} loggedIn={user}><Calendar /></Protecte>} />
                            <Route exact path={ROUTES.CAMPAIGN} element={<Protecte auth={permissions.campaign} loggedIn={user}><LocalCampaigns /></Protecte>} />
                            <Route exact path={ROUTES.MAP} element={<Protecte auth={permissions.map} loggedIn={user}><Maps /></Protecte>} />
                            <Route exact path={ROUTES.SUPPORT} element={<Protecte auth={permissions.support} loggedIn={user}><Support /></Protecte>} />
                            <Route exact path={ROUTES.FAQ} element={<Protecte auth={permissions.faq} loggedIn={user}><FAQ /></Protecte>} />
                            <Route exact path={ROUTES.LOGIN} element={<Login />} />
                            <Route path={ROUTES.ERROR} element={<Protecte auth={permissions.error} loggedIn={user}><Error /></Protecte>} />
                        </Routes>
                    )
            }
        }
    }, [userDetails, permissions, user])

    return (
        <Box className={classes.Router}>
            <Toaster position={'bottom-center'} />
            <Main >
                {Boolean(Object.keys(user).length) && HeaderAndSideBar}
                {getRoutes()}
            </Main>
        </Box >
    );
}

export default Root;