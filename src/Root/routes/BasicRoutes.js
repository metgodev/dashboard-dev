import React from 'react'
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../data/routes'
import { Routes, Route, Navigate, } from 'react-router-dom'
import Login from '../../pages/login/Login'
import { Box, CircularProgress } from '@material-ui/core'

function BasicRoutes() {

    return (
        <Routes>
            <Route exact path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} />} />
            <Route exact path={BUSINESS_OWNER_ROUTES.LOGIN} element={<Login />} />
            <Route exact path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.ERROR} element={<Box style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress size={50} /></Box>} />
        </Routes>
    )

}

export default BasicRoutes