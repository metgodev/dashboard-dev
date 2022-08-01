import { reAuth } from '../API/metro';

export const Protecte = ({ auth, children }) => {
    return auth ? children : <></>;
}

export const Reauthenticate = (setLoggedIn, navigate, pathname) => {
    reAuth().then((res) => {
        setLoggedIn(true);
        if (pathname !== '/login') {
            navigate(pathname);
        } else {
            navigate('/dashboard');
        }
    }).catch((err) => {
        setLoggedIn(false);
        navigate('/login')
    })
}
