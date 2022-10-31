import React from 'react'
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../data/routes'
import { Routes, Route, Navigate, } from 'react-router-dom'
import Login from '../../pages/login/Login'
import Error from '../../pages/error/Error'
import { Protecte } from '../rootHelper'
import Maps from '../../pages/maps/Maps'
import Support from '../../pages/support/Support'
import FAQ from '../../pages/FAQ/FAQ'
import UsersTable from '../../pages/userstable/UsersTable'
import Profile from '../../pages/profile/Profile'
import Businesses from '../../pages/businesses/Businesses'
import BusinessRegister from '../../pages/login/businessLogin/BusinessRegister'

function MemberRoutes({ permissions, user }) {
    return (
        <Routes>
            <Route exact path={ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Navigate to={BUSINESS_OWNER_ROUTES.DASHBOARD} /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.BUSINESSES} element={<Protecte auth={permissions.business} loggedIn={user}><Businesses /></Protecte>} />
            <Route exact path={BUSINESS_OWNER_ROUTES.LOGIN} element={<BusinessRegister />} />
            <Route exact path={ROUTES.MAP} element={<Protecte auth={permissions.map} loggedIn={user}><Maps /></Protecte>} />
            <Route exact path={ROUTES.SUPPORT} element={<Protecte auth={permissions.support} loggedIn={user}><Support /></Protecte>} />
            <Route exact path={ROUTES.FAQ} element={<Protecte auth={permissions.faq} loggedIn={user}><FAQ /></Protecte>} />
            <Route exact path={ROUTES.LOGIN} element={<Login />} />
            <Route exact path={ROUTES.USERS} element={<Protecte auth={permissions.users} loggedIn={user}><UsersTable /></Protecte>} />
            <Route path={ROUTES.ERROR} element={<Protecte auth={permissions.error} loggedIn={user}><Error /></Protecte>} />
            <Route exact path={ROUTES.PROFILE} element={<Protecte auth={permissions.profile} loggedIn={user}><Profile /></Protecte>} />
        </Routes>
    )
}

export default MemberRoutes