import React, { useState } from "react";
import { Box } from '@mui/material'
import { Button } from '../Wrappers/Wrappers'
import Calendar from "../Calendar/Calendar";
// styles
import useStyles from "./styles";

function HeaderButtons({ btns }) {
    let classes = useStyles()
    const [variant, setVariant] = useState('')


    return (
        <>
            <Box className={classes.boxWrapper} >
                <Calendar type={2} />
                <Box className={classes.box}>
                    {btns && btns.map(({ name, func }) => {
                        const click = () => setVariant(name)
                        return (<Button
                            classes={{ root: classes.button }}
                            variant={variant === name ? 'contained' : 'outlined'}
                            color="primary"
                            key={name}
                            onClick={() => click()}
                        > {name}
                        </Button>)
                    })}
                </Box>
            </Box >
        </>
    )
}

export default HeaderButtons
