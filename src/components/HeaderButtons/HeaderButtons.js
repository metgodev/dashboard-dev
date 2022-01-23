import React from "react";
import { Box, IconButton } from '@mui/material'
import { Button } from '../Wrappers/Wrappers'

// styles
import useStyles from "./styles";

function HeaderButtons({ btns, mobile }) {
    let classes = useStyles()

    return (
        <>
            {btns && btns.map(({ name, func, input, icon, buttonIcon }) =>
                <Box className={classes.box} key={name}>
                    {icon ?
                        <IconButton
                            size="small"
                            aria-label="move-between-screens"
                            onClick={() => !input && func()}
                        >
                            {icon}
                        </IconButton>
                        :
                        <Button
                            classes={{ root: classes.button }}
                            variant={'outlined'}
                            color="primary"
                            onClick={() => !input && func()}
                            component="label"
                        >
                            {mobile ? name : buttonIcon}
                            {input && <input
                                name="files[]"
                                type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
