import React from 'react'
import { Button, Box } from '@mui/material'
import AgTableProducts from '../../../Tables/AgTableProducts'
import term from '../../../../terms'

function AddProductsTab() {
    return (
        <Box sx={{ height: '100%', width: '100%', direction: 'ltr', padding: '10px' }}>
            <Button sx={{ marginLeft: '5%', marginBottom: '7px' }} variant='contained'>{term('add')}</Button>
            <AgTableProducts />
        </Box >
    )
}

export default AddProductsTab