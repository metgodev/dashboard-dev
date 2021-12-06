import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import App from '../App'
import Header from '../components/Header/Header';
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';
import useStyles from "./styles";


const Root = () => {
    let classes = useStyles();
    let isLoggedIn = true

    const Protecte = ({auth, children })=> {   
        return auth ? children : <Navigate to="/login" />;
    }

    
    return (
        <>
        {isLoggedIn &&<Header/>}
        <div className={classes.Router}>
        <Routes>
            <Route path="/login" element={ <Login/>} />
            <Route exact  path="/" element={<Protecte auth={isLoggedIn}><App /></Protecte>} />
            <Route path='*' element={<Error/>} />
        </Routes>
        </div>
        </>
    );
}

export default Root;