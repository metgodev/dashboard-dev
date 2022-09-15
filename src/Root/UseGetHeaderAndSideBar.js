import { useLocation } from 'react-router-dom'
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../data/routes';

const GetHeaderAndSideBar = () => {

    let location = useLocation();

    if (location?.pathname === ROUTES.LOGIN || location?.pathname === BUSINESS_OWNER_ROUTES.LOGIN) {
        return <></>
    }
    return (
        <>
            <Header />
            <Sidebar location={location} />
        </>
    )
}

export default GetHeaderAndSideBar