import React from 'react'
import Widget from '../Widget/Widget'
import { Typography } from '../Wrappers/Wrappers'
// styles
import useStyles from "./styles";
import attraction from '../../Assets/svgs/attraction.svg'
import culture from '../../Assets/svgs/culture.svg'
import food from '../../Assets/svgs/food.svg'
import local from '../../Assets/svgs/local.svg'
import lodging from '../../Assets/svgs/lodging.svg'
import travel from '../../Assets/svgs/travel.svg'
import { Box, Divider } from '@material-ui/core';


function MetroStats({ product, places, added, svg }) {
    let classes = useStyles();
    let svgArr = [{ attraction }, { culture }, { food }, { local }, { lodging }, { travel }];
    let img = svgArr.find(s => Object.keys(s)[0] == svg && s)

    return (
        <div
            className={classes.box}
            header={
                <div className={classes.title}>
                    <Typography variant="h5">{product}</Typography>
                </div>
            } uppertitle >
            <img src={img[svg]} alt={svg} className={classes.logotype} />
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>{places}</h2> <h3>+{added}</h3>
            </Box>
        </div>
    )
}

export default MetroStats
