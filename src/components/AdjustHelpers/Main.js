import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const sideBarSize = 240;
const sideBarSmallSize = 100;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => {
        const { sidebar, mobile } = useSelector(s => s.mainReducer)
        return ({
            flexGrow: 1,
            //animation
            // transition: theme.transitions.create('margin', {
            //     easing: theme.transitions.easing.sharp,
            //     duration: theme.transitions.duration.leavingScreen,
            // }),
            marginRight: !mobile ? 0 : sidebar ? sideBarSize : sideBarSmallSize,
            ...(sidebar && {
                //animation
                // transition: theme.transitions.create('margin', {
                //     easing: theme.transitions.easing.easeOut,
                //     duration: theme.transitions.duration.enteringScreen,
                // }),
                marginRight: !mobile ? 0 : sidebar ? sideBarSize : sideBarSmallSize,
            }),
        })
    }
);
export default Main;