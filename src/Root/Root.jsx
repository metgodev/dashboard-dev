import React, { useState } from 'react';
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


const Root = () => {
    let classes = useStyles();
    let location = useLocation();
    //local
    let [isLoggedIn] = useState(true)
    //global 
    const { sidebar, mobile } = useSelector(s => s.mainReducer)
    const Protecte = ({ auth, children }) => {
        return auth ? children : <Navigate to="/login" />;
    }

    const shouldDisplay = location.pathname !== '/login' && location.pathname !== '/verification'

    return (
        <div className={classes.Router}>
            <Main open={sidebar} mobile={mobile.toString()}>
                {shouldDisplay &&
                    <>
                        <Header />
                        <SideBar location={location} />
                    </>
                }
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/verification" element={< Protecte auth={isLoggedIn}><Verification /></Protecte>} />
                    <Route exact path="/dashboard" element={<Protecte auth={isLoggedIn}><Dashboard /></Protecte>} />
                    <Route exact path="/businesses" element={<Protecte auth={isLoggedIn}><Businesses /></Protecte>} />
                    <Route exact path="/events" element={<Protecte auth={isLoggedIn}><Events /></ Protecte >} />
                    <Route exact path="/locations" element={<Protecte auth={isLoggedIn}><PointsOfInterest /></Protecte>} />
                    <Route exact path="/routes" element={<Protecte auth={isLoggedIn}><Tracks /></Protecte>} />
                    <Route exact path="/voucher" element={<Protecte auth={isLoggedIn}><Voucher /></Protecte>} />
                    <Route exact path="/users" element={<Protecte auth={isLoggedIn}><UsersTable /></Protecte>} />
                    <Route exact path="/map" element={<Protecte auth={isLoggedIn}><Maps /></Protecte>} />
                    <Route exact path="/support" element={<Protecte auth={isLoggedIn}><Support /></Protecte>} />
                    <Route exact path="/FAQ" element={<Protecte auth={isLoggedIn}><FAQ /></Protecte>} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Main>
        </div >
    );
}

export default Root;