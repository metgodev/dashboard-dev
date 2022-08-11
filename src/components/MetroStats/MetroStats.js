import React from 'react'
import { Typography } from '../Wrappers/Wrappers'
import { Box, CircularProgress, Divider } from '@material-ui/core';
// styles
import useStyles from "./styles";
import attraction from '../../Assets/svgs/attraction.svg'
import culture from '../../Assets/svgs/culture.svg'
import food from '../../Assets/svgs/food.svg'
import local from '../../Assets/svgs/local.svg'
import lodging from '../../Assets/svgs/lodging.svg'
import travel from '../../Assets/svgs/travel.svg'

function MetroStats({ title, ammount, svg, setSelectedCategory, selectedCategory, clickable }) {

    let classes = useStyles();
    let svgArr = [{ attraction }, { culture }, { food }, { local }, { lodging }, { travel }];
    let img = svgArr.find(s => Object.keys(s)[0] == svg && s)

    return (
        <div className={classes.box} onClick={() => {
            if (setSelectedCategory) {
                selectedCategory === null || selectedCategory !== svg ? setSelectedCategory(svg) : setSelectedCategory(null)
            }
        }}>
            <img src={img[svg]} alt={svg} className={clickable ? classes.logotypeClickable : classes.logotype} />
            <div className={classes.title}>
                <Typography variant="h5">{title}</Typography>
            </div>
            <Divider />
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <h2 className={classes.h}>{ammount > 0 ? ammount : <CircularProgress size={10} />}</h2>
            </Box>
        </div >
    )
}

export default MetroStats

