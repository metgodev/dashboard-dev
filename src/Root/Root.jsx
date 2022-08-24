import React, { useLayoutEffect, useState } from 'react';
//MUI
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { Box } from '@material-ui/core';
//pages
import Header from '../components/Header/Header';
import SideBar from '../components/Sidebar/Sidebar';
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
// admin pages
import AuthorityMng from '../pages/admin/AuthorityMng';
import TagCategoriesMng from '../pages/admin/TagCategoriesMng';
//Helper
import { Protecte } from './rootHelper.js';
//Components
import { Toaster } from 'react-hot-toast';
//Redux
import { reAuth } from '../API/metro';
import { set_user_details } from '../REDUX/actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import GetPermissions from '../hooks/GetPermissions'

const Root = () => {
    //Styles
    let classes = useStyles();
    //Global state
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let location = useLocation();
    //Local state
    const [loggedIn, setLoggedIn] = useState(false);
    const userDetails = useSelector(s => s.userReducer.userDetails)
    const permissions = GetPermissions(userDetails ? userDetails : null)

    useLayoutEffect(() => {
        (async () => {
            try {
                const user = await reAuth()
                dispatch(set_user_details(user))
                setLoggedIn(true)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    return (
        <Box className={classes.Router}>
            <Toaster
                position={'bottom-center'}
            />
            <Main >
                {loggedIn &&
                    <>
                        <Header />
                        <SideBar location={location} />
                    </>
                }
                <Routes>
                    <Route exact path="/" element={<Protecte auth={permissions.main}><Navigate to="/dashboard" /></Protecte>} />
                    <Route exact path="/dashboard" element={<Protecte auth={permissions.dashboard}><Dashboard /></Protecte>} />
                    <Route exact path="/verification" element={< Protecte auth={permissions.verification}><Verification /></Protecte>} />
                    <Route exact path="/businesses" element={<Protecte auth={permissions.business}><Businesses /></Protecte>} />
                    <Route exact path="/events" element={<Protecte auth={permissions.events}><Events /></ Protecte >} />
                    <Route exact path="/locations" element={<Protecte auth={permissions.locations}><PointsOfInterest /></Protecte>} />
                    <Route exact path="/routes" element={<Protecte auth={permissions.routes}><Tracks /></Protecte>} />
                    <Route exact path="/voucher" element={<Protecte auth={permissions.voucher}><Voucher /></Protecte>} />
                    <Route exact path="/users" element={<Protecte auth={permissions.users}><UsersTable /></Protecte>} />
                    <Route exact path="/campaign" element={<Protecte auth={permissions.campaign}><LocalCampaigns /></Protecte>} />
                    <Route exact path="/map" element={<Protecte auth={permissions.map}><Maps /></Protecte>} />
                    <Route exact path="/support" element={<Protecte auth={permissions.support}><Support /></Protecte>} />
                    <Route exact path="/FAQ" element={<Protecte auth={permissions.faq}><FAQ /></Protecte>} />
                    <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                    <Route path='*' element={<Protecte auth={permissions.error}><Error /></Protecte>} />
                    <Route exact path="/admin/authority" element={<Protecte auth={permissions.authority}><AuthorityMng /></Protecte>} />
                    <Route exact path="/admin/tagcategories" element={<Protecte auth={permissions.tagcategories}><TagCategoriesMng /></Protecte>} />
                </Routes>
            </Main>
        </Box >
    );
}

export default Root;