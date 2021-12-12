import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import Main from '../components/AdjustHelpers/Main';
import AppBar from '../components/AdjustHelpers/AppBar';
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import useStyles from "./styles";


const Root = () => {
    let classes = useStyles();
    let location = useLocation();
    //local
    let [isLoggedIn] = useState(location.pathname != '/login')
    //global 
    const { sidebar, mobile } = useSelector(s => s.mainReducer)

    const Protecte = ({ auth, children }) => {
        return auth ? children : <Navigate to="/login" />;
    }

    return (
        <div className={classes.Router}>
            <Main open={sidebar} mobile={mobile}>
                <AppBar open={sidebar}>
                    {isLoggedIn && <Header />}
                </AppBar>
                <SideBar location={location} />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route exact path="/" element={<Protecte auth={isLoggedIn}><Dashboard /></Protecte>} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Main>
        </div>
    );
}

export default Root;