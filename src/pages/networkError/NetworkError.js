import React from 'react'
import { Box } from '@mui/material'
import useStyles from './styles'
import Lottie from 'react-lottie'
import animatedErr from '../../Assets/lottie/NoInternet.json'

function NetworkError() {

    const classes = useStyles()

    const options = {
        loop: true,
        autoplay: true,
        animationData: animatedErr,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Box className={classes.container}>
            <Lottie width={'30%'} height={'30%'} options={options} autoplay={true} loop={true} />
        </Box>
    )
}

export default NetworkError