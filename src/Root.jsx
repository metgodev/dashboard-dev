import React, { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import App from './App'

const Root = () => {

    let location = useLocation();

    useLayoutEffect(() => {
        let pageName = location.pathname.substring(1);
    }, [location])

    return (
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    );
}

export default Root;