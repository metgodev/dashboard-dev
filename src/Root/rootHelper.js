import Header from '../components/Header/Header';
import SideBar from '../components/Sidebar/Sidebar';

export const Protecte = ({ auth, children }) => {
    return auth ? children : <></>;
}

export const getHeaderAndSidebar = (location) => {
    return (
        <>
            <Header />
            <SideBar location={location} />
        </>
    )
}