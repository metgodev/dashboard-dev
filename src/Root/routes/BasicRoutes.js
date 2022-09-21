import React from 'react'
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../data/routes'
import { Routes, Route } from 'react-router-dom'
import Login from '../../pages/login/Login'
import Error from '../../pages/error/Error'
import { Protecte } from '../rootHelper'
import Dashboard from '../../pages/dashboard/Dashboard'

function BasicRoutes({ permissions, user }) {

    return (
        <Routes>
            <Route exact path={ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Dashboard /></Protecte>} />
            <Route exact path={ROUTES.DASHBOARD} element={<Protecte auth={permissions.dashboard} loggedIn={user}><Dashboard /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.LOGIN} element={<Login />} />
            <Route exact path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.ERROR} element={<Error />} />
        </Routes>
    )

}

export default BasicRoutes