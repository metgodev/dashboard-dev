import Login from '../pages/login/Login';

export const Protecte = ({ auth, loggedIn, children }) => {
    if (!Boolean(Object.keys(loggedIn).length)) {
        return <Login />
    } else {
        return auth ? children : <></>;
    }
}