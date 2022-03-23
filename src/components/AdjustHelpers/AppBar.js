import { styled } from '@mui/material/styles';
const windowWidth = window.innerWidth;

const sideBarSize = windowWidth * 0.2;
const sideBarSmallSize = windowWidth * 0.1;

const AppBar = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${open ? sideBarSize : sideBarSmallSize}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default AppBar; 