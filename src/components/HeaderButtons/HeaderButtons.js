import React, { useState } from "react";
import { Box, IconButton } from '@mui/material'
import { Button } from '../Wrappers/Wrappers'
// styles
import useStyles from "./styles";

function HeaderButtons({ btns }) {
    let classes = useStyles()
    const [variant, setVariant] = useState('')


    return (
        <>
            {btns && btns.map(({ name, func, input, icon }) => {
                const click = () => {
                    func()
                    setVariant(name)
                }
                return (
                    <Box className={classes.box} key={name}>
                        {icon ?
                            <IconButton
                                size="small"
                                aria-label="move-between-screens"
                                onClick={() => !input && click()}
                            >
                                {icon}
                            </IconButton> :
                            <Button
                                classes={{ root: classes.button }}
                                variant={variant === name ? 'contained' : 'outlined'}
                                color="primary"
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
                            </Button>}
                    </Box>
                )
            })}
        </>
    )
}

export default HeaderButtons
