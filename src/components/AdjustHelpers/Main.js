import { styled } from '@mui/material/styles';

const sideBarSize = 240;
const sideBarSmallSize = 100;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, mobile }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: !mobile ? 0 : open ? sideBarSize : sideBarSmallSize,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: !mobile ? 0 : open ? sideBarSize : sideBarSmallSize,
        }),
    }),
);
export default Main;