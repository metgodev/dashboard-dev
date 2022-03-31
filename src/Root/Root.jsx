import React, { useLayoutEffect, useState } from 'react';
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
import LocalCampaigns from '../pages/localCampains/LocalCampaigns';
import { reAuth } from '../API/metro';


const Root = () => {
    let classes = useStyles();
    let navigate = useNavigate()
    let location = useLocation();
    let { pathname } = location;
    const [loggedIn, setLoggedIn] = useState(false);

    const Protecte = ({ auth, children }) => {
        return auth ? children : <Navigate to="/login" />;
    }

    const shouldDisplay = pathname !== '/login' && pathname !== '/verification';
    let isSuperAdmin = true;

    useLayoutEffect(() => {
        reAuth().then((res) => {
            setLoggedIn(true);
            navigate(location);
        }).catch((err) => {
            setLoggedIn(false);
            navigate('/login');
        })
    }, [])


    return (
        <Box className={classes.Router}>
            <Main >
                {shouldDisplay &&
                    <>
                        <Protecte auth={loggedIn}>
                            <Header />
                            <SideBar location={location} />
                        </Protecte>
                    </>
                }
                <Routes>
                    <Route exact path="/" element={<Protecte auth={loggedIn}><Navigate to="/dashboard" /></Protecte>} />
                    <Route exact path="/dashboard" element={<Protecte auth={loggedIn}><Dashboard /></Protecte>} />
                    <Route exact path="/verification" element={< Protecte auth={loggedIn}><Verification /></Protecte>} />
                    <Route exact path="/businesses" element={<Protecte auth={loggedIn}><Businesses /></Protecte>} />
                    <Route exact path="/events" element={<Protecte auth={loggedIn}><Events /></ Protecte >} />
                    <Route exact path="/locations" element={<Protecte auth={loggedIn}><PointsOfInterest /></Protecte>} />
                    <Route exact path="/routes" element={<Protecte auth={loggedIn}><Tracks /></Protecte>} />
                    <Route exact path="/voucher" element={<Protecte auth={loggedIn}><Voucher /></Protecte>} />
                    <Route exact path="/users" element={<Protecte auth={loggedIn}><UsersTable /></Protecte>} />
                    <Route exact path="/campaign" element={<Protecte auth={loggedIn}><LocalCampaigns /></Protecte>} />
                    <Route exact path="/map" element={<Protecte auth={loggedIn}><Maps /></Protecte>} />
                    <Route exact path="/support" element={<Protecte auth={loggedIn}><Support /></Protecte>} />
                    <Route exact path="/FAQ" element={<Protecte auth={loggedIn}><FAQ /></Protecte>} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path='*' element={<Protecte auth={loggedIn}><Error /></Protecte>} />
                    {isSuperAdmin &&
                        <>
                            <Route exact path="/admin/areas" element={<Protecte auth={loggedIn}><AreaManagement /></Protecte>} />
                        </>
                    }
                </Routes>
            </Main>
        </Box >
    );
}

export default Root;