import { styled } from '@mui/material/styles';

const sideBarSize = 240;
const sideBarSmallSize = 100;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, mobile }) => {
        let isTrueSet = (mobile === 'false');
        return ({
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginRight: isTrueSet ? 0 : open ? sideBarSize : sideBarSmallSize,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: isTrueSet ? 0 : open ? sideBarSize : sideBarSmallSize,
            }),
        })
    }
);
export default Main;