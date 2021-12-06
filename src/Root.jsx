import React, { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import Error from './pages/error/Error';

const Root = () => {

    let location = useLocation();

    // useLayoutEffect(() => {
    //     let pageName = location.pathname.substring(1);
    // }, [location])

    return (
        <Routes>
            <Route exact  path="/" element={<App />} />
            <Route path='*' element={<Error/>} />
        </Routes>
    );
}

export default Root;