import React, { useState } from "react";
import { Box, IconButton } from '@mui/material'
import { Button } from '../Wrappers/Wrappers'

// styles
import useStyles from "./styles";

function HeaderButtons({ btns }) {
    let classes = useStyles()

    return (
        <>
            {btns && btns.map(({ name, func, input, icon }) =>
                <Box className={classes.box} key={name}>
                    {icon ?
                        <IconButton
                            size="small"
                            aria-label="move-between-screens"
                            onClick={() => !input && func()}
                        >
                            {icon}
                        </IconButton> :
                        <Button
                            classes={{ root: classes.button }}
                            variant={'outlined'}
                            color="primary"
                            onClick={() => !input && func()}
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
            )}
        </>
    )
}

export default HeaderButtons
