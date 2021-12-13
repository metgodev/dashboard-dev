import { Box, Button, ButtonGroup } from '@mui/material'
import React from 'react'

function HeaderButtons({ color, btns, size }) {
    console.log(color.color, btns.btns, size.size, 'here')
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
            }}
        >
            <ButtonGroup color={color.color || "primary"} variant="contained" size={size.size || 'small'} aria-label="small button group">
                {btns.btns && btns.btns.map(({ name, func }) => {
                    return (<Button key={name} onClick={() => func()}>{name}</Button>)
                })}
            </ButtonGroup>
        </Box >
    )
}

export default HeaderButtons
