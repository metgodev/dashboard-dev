export const Protecte = ({ auth, children }) => {
    return auth ? children : <></>;
}