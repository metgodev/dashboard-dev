import React from 'react'
import Widget from '../Widget/Widget'
import { Typography } from '../Wrappers/Wrappers'
import { Box, Divider } from '@material-ui/core';
// styles
import useStyles from "./styles";
import attraction from '../../Assets/svgs/attraction.svg'
import culture from '../../Assets/svgs/culture.svg'
import food from '../../Assets/svgs/food.svg'
import local from '../../Assets/svgs/local.svg'
import lodging from '../../Assets/svgs/lodging.svg'
import travel from '../../Assets/svgs/travel.svg'
import classnames from "classnames";



function MetroStats({ product, places, added, svg }) {
    let classes = useStyles();
    let svgArr = [{ attraction }, { culture }, { food }, { local }, { lodging }, { travel }];
    let img = svgArr.find(s => Object.keys(s)[0] == svg && s)

    return (
        <div className={classes.box} >
            <img src={img[svg]} alt={svg} className={classes.logotype} />
            <div className={classes.title}>
                <Typography variant="h5">{product}</Typography>
            </div>
            <Divider />
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <h2 className={classes.h}>{places}</h2>
                <div className={classes.circleBox}>
                    <h5 className={classnames(classes.h, classes.circle)}>+{added}</h5>
                </div>
            </Box>
        </div >
    )
}

export default MetroStats
