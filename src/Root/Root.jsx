import React, { useState, useLayoutEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import Main from '../components/AdjustHelpers/Main';
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';
import Verification from '../pages/login/Verification';
import Dashboard from '../pages/dashboard/Dashboard';
import useStyles from "./styles";
import Businesses from '../pages/businesses/Businesses';
import Events from '../pages/events/Events';
import PointsOfInterest from '../pages/points/PointsOfInterest';
import Tracks from '../pages/tracks/Tracks';
import Voucher from '../pages/voucher/Voucher';
import UsersTable from '../pages/userstable/UsersTable';
import Maps from '../pages/maps/Maps';
import Support from '../pages/support/Support';
import FAQ from '../pages/FAQ/FAQ';
import { Box } from '@material-ui/core';
import { isLoggedIn } from '../API/metro';


const Root = () => {
    let logged = isLoggedIn()
    let classes = useStyles();
    let location = useLocation();
    let { pathname } = location;
    //global 
    const { sidebar, mobile } = useSelector(s => s.mainReducer)

    const Protecte = ({ auth, children }) => {
        return auth ? children : <Navigate to="/login" />;
    }

    const shouldDisplay = pathname !== '/login' && pathname !== '/verification';
    console.log(logged)
    return (
        <Box className={classes.Router}>
            <Main open={sidebar} mobile={mobile.toString()}>
                {shouldDisplay &&
                    <>
                        <Header />
                        <SideBar location={location} />
                    </>
                }
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/verification" element={< Protecte auth={logged}><Verification /></Protecte>} />
                    <Route exact path="/dashboard" element={<Protecte auth={logged}><Dashboard /></Protecte>} />
                    <Route exact path="/businesses" element={<Protecte auth={logged}><Businesses /></Protecte>} />
                    <Route exact path="/events" element={<Protecte auth={logged}><Events /></ Protecte >} />
                    <Route exact path="/locations" element={<Protecte auth={logged}><PointsOfInterest /></Protecte>} />
                    <Route exact path="/routes" element={<Protecte auth={logged}><Tracks /></Protecte>} />
                    <Route exact path="/voucher" element={<Protecte auth={logged}><Voucher /></Protecte>} />
                    <Route exact path="/users" element={<Protecte auth={logged}><UsersTable /></Protecte>} />
                    <Route exact path="/map" element={<Protecte auth={logged}><Maps /></Protecte>} />
                    <Route exact path="/support" element={<Protecte auth={logged}><Support /></Protecte>} />
                    <Route exact path="/FAQ" element={<Protecte auth={logged}><FAQ /></Protecte>} />
                    <Route path='*' element={<Protecte auth={logged}><Error /></Protecte>} />
                </Routes>
            </Main>
        </Box >
    );
}

export default Root;