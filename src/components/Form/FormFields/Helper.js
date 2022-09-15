import { Box, Tooltip } from '@mui/material'
import React from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

function Helper({ tooltip }) {
    return (
        <Box style={{ width: '100%', textAlign: 'left' }}>
            <Tooltip title={tooltip} followCursor>
                <HelpOutlineOutlinedIcon style={{ color: 'rgba(0,0,0,0.3)' }} />
            </Tooltip>
        </Box>
    )
}

export default Helper