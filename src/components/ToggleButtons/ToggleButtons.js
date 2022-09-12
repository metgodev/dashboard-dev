import React from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import useStyles from './styles'

function ToggleButtons({ buttons, size, color, value, onChange, exclusive }) {

    const classes = useStyles()

    return (
        <ToggleButtonGroup
            className={classes.toggleButtons}
            size={size}
            color={color}
            value={value}
            onChange={onChange}
            exclusive={exclusive}
        >
            {buttons.length > 1 && buttons.map(({ title, type }) => {
                return (
                    <ToggleButton value={type} key={type} className={classes.toggleButton}>
                        {title}
                    </ToggleButton>
                )
            })}
        </ToggleButtonGroup>
    )
}

export default ToggleButtons