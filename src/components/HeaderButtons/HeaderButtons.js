import React, { useState } from "react";
import { Box } from '@mui/material'
import { Button } from '../Wrappers/Wrappers'
// styles
import useStyles from "./styles";

function HeaderButtons({ btns }) {
    let classes = useStyles()
    const [variant, setVariant] = useState('')


    return (
        <>
            <Box className={classes.box}>
                {btns && btns.map(({ name, func, input }) => {
                    const click = () => {
                        func()
                        setVariant(name)
                    }
                    return (<Button
                        classes={{ root: classes.button }}
                        variant={variant === name ? 'contained' : 'outlined'}
                        color="primary"
                        key={name}
                        onClick={() => !input && click()}
                        component="label"
                    >
                        {name}
                        {input && <input
                            name="files[]"
                            type="file"
                            hidden
                            onChange={(e) => func(e)}
                        />}
                    </Button>)
                })}
            </Box >
        </>
    )
}

export default HeaderButtons
