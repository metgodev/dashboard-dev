import { Navigate } from 'react-router-dom'
import { reAuth } from '../API/metro';

export const Protecte = ({ auth, children }) => {
    return auth ? children : <Navigate to="/login" />;
}

export const Reauthenticate = (setLoggedIn, navigate, pathname) => {
    reAuth().then((res) => {
        setLoggedIn(true);
        navigate(pathname);
    }).catch((err) => {
        setLoggedIn(false);
    })
}
