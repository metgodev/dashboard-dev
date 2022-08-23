import { React, useState } from 'react'
import Switch from '@mui/material/Switch';
import { CircularProgress } from '@mui/material';
import { _patch } from '../../../../API/service';
import { SERVICE } from '../productsTableConfig'

function InStockRenderer(params) {

    const [loading, setLoading] = useState(null)
    const [value, setValue] = useState(params.data.inStock)

    const handleChange = async () => {
        setLoading(true)
        try {
            const res = await _patch(SERVICE, params.data._id, { inStock: !value })
            if (res) {
                setValue(prev => !prev)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {loading ?
                <CircularProgress />
                :
                <Switch
                    checked={value}
                    onChange={handleChange}
                />}
        </div>
    )
}

export default InStockRenderer