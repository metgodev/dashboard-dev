import React from 'react'
import { Button } from '@mui/material'
import term from '../../../../terms'

function CopyRenderer() {
    return (
        <Button
            variant={'contained'}
            onClick={() => console.log('copy')}
        >
            {term('duplicate')}
        </Button>
    )
}

export default CopyRenderer