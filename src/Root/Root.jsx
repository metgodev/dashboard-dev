import React, { useLayoutEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Box } from '@material-ui/core';
import { isLoggedIn, isVerified, reAuth } from '../API/metro';
//pages
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
// admin pages
import AreaManagement from '../pages/admin/AreaManagement';
import AuthorityManagement from '../pages/admin/AuthorityManagement';
import TagsManagement from '../pages/admin/TagsManagement';


const Root = () => {
    let logged = isLoggedIn();
    let verified = isVerified();
    let classes = useStyles();
    let location = useLocation();
    let { pathname } = location;

    const Protecte = ({ auth, children }) => {
        return auth ? children : <Navigate to="/login" />;
    }

    const shouldDisplay = pathname !== '/login' && pathname !== '/verification';
    let isSuperAdmin = true;

    return (
        <Box className={classes.Router}>
            <Main >
                {shouldDisplay &&
                    <>
                        <Header />
                        <SideBar location={location} />
                    </>
                }
                <Routes>
                    <Route exact path="/" element={<Protecte auth={verified}><Navigate to="/dashboard" /></Protecte>} />
                    <Route exact path="/dashboard" element={<Protecte auth={verified}><Dashboard /></Protecte>} />
                    <Route exact path="/verification" element={< Protecte auth={logged}><Verification /></Protecte>} />
                    <Route exact path="/businesses" element={<Protecte auth={verified}><Businesses /></Protecte>} />
                    <Route exact path="/events" element={<Protecte auth={verified}><Events /></ Protecte >} />
                    <Route exact path="/locations" element={<Protecte auth={verified}><PointsOfInterest /></Protecte>} />
                    <Route exact path="/routes" element={<Protecte auth={verified}><Tracks /></Protecte>} />
                    <Route exact path="/voucher" element={<Protecte auth={verified}><Voucher /></Protecte>} />
                    <Route exact path="/users" element={<Protecte auth={verified}><UsersTable /></Protecte>} />
                    <Route exact path="/map" element={<Protecte auth={verified}><Maps /></Protecte>} />
                    <Route exact path="/support" element={<Protecte auth={verified}><Support /></Protecte>} />
                    <Route exact path="/FAQ" element={<Protecte auth={verified}><FAQ /></Protecte>} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path='*' element={<Protecte auth={verified}><Error /></Protecte>} />
                    {isSuperAdmin &&
                        <>
                            <Route exact path="/admin/areas" element={<Protecte auth={verified}><AreaManagement/></Protecte>} />
                            <Route exact path="/admin/authorities" element={<Protecte auth={verified}><AuthorityManagement/></Protecte>} />
                            <Route exact path="/admin/tags" element={<Protecte auth={verified}><TagsManagement/></Protecte>} />
                        </>
                    }
                </Routes>
            </Main>
        </Box >
    );
}

export default Root;