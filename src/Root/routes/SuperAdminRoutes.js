import React from 'react'
import { ROUTES } from '../../data/routes'
import { Protecte } from '../rootHelper'
import { Routes, Route, Navigate, } from 'react-router-dom'
import Login from '../../pages/login/Login'
import Error from '../../pages/error/Error'
import AuthorityMng from '../../pages/admin/AuthorityMng'
import TagCategoriesMng from '../../pages/admin/TagCategoriesMng'
import FAQ from '../../pages/FAQ/FAQ'
import UsersTable from '../../pages/userstable/UsersTable'
import Maps from '../../pages/maps/Maps'
import LocalCampaigns from '../../pages/localCampains/LocalCampaigns'
import Dashboard from '../../pages/dashboard/Dashboard'
import Calendar from '../../pages/calendar/Calendar'
import Profile from '../../pages/profile/Profile'
import Businesses from '../../pages/businesses/Businesses'
import Events from '../../pages/events/Events'
import PointsOfInterest from '../../pages/points/PointsOfInterest'
import Tracks from '../../pages/tracks/Tracks'
import Products from '../../pages/products/Products'
import Voucher from '../../pages/voucher/Voucher'
import Support from '../../pages/support/Support'
import AreaMng from '../../pages/admin/AreaMng'

function SuperAdminRoutes({ permissions, user }) {
    return (
        <Routes>
            <Route exact path={ROUTES.ROOT} element={<Protecte auth={permissions.main} loggedIn={user}><Navigate to={ROUTES.DASHBOARD} /></Protecte>} />
            <Route exact path={ROUTES.DASHBOARD} element={<Protecte auth={permissions.dashboard} loggedIn={user}><Dashboard /></Protecte>} />
            <Route exact path={ROUTES.PROFILE} element={<Protecte auth={permissions.profile} loggedIn={user}><Profile /></Protecte>} />
            <Route exact path={ROUTES.BUSINESSES} element={<Protecte auth={permissions.business} loggedIn={user}><Businesses /></Protecte>} />
            <Route exact path={ROUTES.EVENTS} element={<Protecte auth={permissions.events} loggedIn={user}><Events /></ Protecte >} />
            <Route exact path={ROUTES.POINTS} element={<Protecte auth={permissions.locations} loggedIn={user}><PointsOfInterest /></Protecte>} />
            <Route exact path={ROUTES.TRACKS} element={<Protecte auth={permissions.routes} loggedIn={user}><Tracks /></Protecte>} />
            <Route exact path={ROUTES.PRODUCTS} element={<Protecte auth={permissions.products} loggedIn={user}><Products /></Protecte>} />
            <Route exact path={ROUTES.VOUCHER} element={<Protecte auth={permissions.vouchers} loggedIn={user}><Voucher /></Protecte>} />
            <Route exact path={ROUTES.CALENDAR} element={<Protecte auth={permissions.calendar} loggedIn={user}><Calendar /></Protecte>} />
            <Route exact path={ROUTES.CAMPAIGN} element={<Protecte auth={permissions.campaign} loggedIn={user}><LocalCampaigns /></Protecte>} />
            <Route exact path={ROUTES.MAP} element={<Protecte auth={permissions.map} loggedIn={user}><Maps /></Protecte>} />
            <Route exact path={ROUTES.SUPPORT} element={<Protecte auth={permissions.support} loggedIn={user}><Support /></Protecte>} />
            <Route exact path={ROUTES.FAQ} element={<Protecte auth={permissions.faq} loggedIn={user}><FAQ /></Protecte>} />
            <Route exact path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.ERROR} element={<Protecte auth={permissions.error} loggedIn={user}><Error /></Protecte>} />
            {/* Admin sections */}
            <Route exact path={ROUTES.AUTHORITY} element={<Protecte auth={permissions.authority} loggedIn={user}><AuthorityMng /></Protecte>} />
            <Route exact path={ROUTES.TAG_CATEGORIES} element={<Protecte auth={permissions.tagcategories} loggedIn={user}><TagCategoriesMng /></Protecte>} />
            <Route exact path={ROUTES.USERS} element={<Protecte auth={permissions.users} loggedIn={user}><UsersTable /></Protecte>} />
            <Route exact path={ROUTES.AREA} element={<Protecte auth={permissions.area} loggedIn={user}><AreaMng /></Protecte>} />
        </Routes>
    )
}

export default SuperAdminRoutes