import React from 'react'
import { BUSINESS_OWNER_ROUTES } from '../../data/routes'
import Login from '../../pages/login/Login'
import { Protecte } from '../rootHelper'
import { Routes, Route, Navigate, } from 'react-router-dom'
import Events from '../../pages/events/Events'
import Maps from '../../pages/maps/Maps'
import FAQ from '../../pages/FAQ/FAQ'
import Support from '../../pages/support/Support'
import Profile from '../../pages/profile/Profile'
import Dashboard from '../../pages/dashboard/Dashboard'
import Businesses from '../../pages/businesses/Businesses'

function BusinessOwnerRoutes({ permissions, user }) {
    return (
        <Routes>
            <Route exact path={BUSINESS_OWNER_ROUTES.LOGIN} element={<Login />} />
            <Route exact path={BUSINESS_OWNER_ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Navigate to={BUSINESS_OWNER_ROUTES.DASHBOARD} /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.BUSINESSES} element={<Protecte auth={permissions.business} loggedIn={user}><Businesses /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.EVENTS} element={<Protecte auth={permissions.events} loggedIn={user}><Events /></ Protecte >} />
            <Route exact path={BUSINESS_OWNER_ROUTES.MAP} element={<Protecte auth={permissions.map} loggedIn={user}><Maps /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.SUPPORT} element={<Protecte auth={permissions.support} loggedIn={user}><Support /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.FAQ} element={<Protecte auth={permissions.faq} loggedIn={user}><FAQ /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.PROFILE} element={<Protecte auth={permissions.profile} loggedIn={user}><Profile /></Protecte>} />
        </Routes>
    )
}

export default BusinessOwnerRoutes