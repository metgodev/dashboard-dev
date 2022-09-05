import Header from '../components/Header/Header';
import SideBar from '../components/Sidebar/Sidebar';
import { ROUTES } from '../data/routes';
import Login from '../pages/login/Login';

export const Protecte = ({ auth, loggedIn, children }) => {
    if (Boolean(!Object.keys(loggedIn).length)) {
        return <Login />
    } else {
        return auth ? children : <></>;
    }
}

export const getHeaderAndSidebar = (location) => {
    if (location?.pathname === ROUTES.LOGIN) {
        return <></>
    }
    return (
        <>
            <Header />
            <SideBar location={location} />
        </>
    )
}