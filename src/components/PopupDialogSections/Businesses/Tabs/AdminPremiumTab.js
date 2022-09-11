import { Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import term from '../../../../terms'
import useStyles from './styles'
import STATUS from '../../../../data/entity_status'
import BACK_ROUTES from '../../../../data/back_routes'
import { Button } from '@mui/material'
import { _patch } from '../../../../API/service'
import Toast from '../../../../utils/useToast'
import { set_table_changed } from '../../../../REDUX/actions/main.actions'

function AdminPremiumTab({ handleClose }) {

    const classes = useStyles()
    const businessData = useSelector(s => s.mainReducer.editTabData)
    const dispatch = useDispatch()
    const [premiumStatus, setPremiumStatus] = useState('')

    useEffect(() => {
        if (businessData.isPremium) {
            switch (businessData.premium) {
                case false:
                    setPremiumStatus(STATUS.PRIVATE)
                    break;
                default:
                    setPremiumStatus(businessData.isPremium)
            }
        }
    }, [businessData])

    const handleChange = (e) => {
        setPremiumStatus(e.target.value)
    }

    const handleClick = async () => {
        try {
            await _patch(BACK_ROUTES.BUSINESS, businessData._id, { isPremium: premiumStatus })
            dispatch(set_table_changed('change'))
            handleClose(true)
        } catch (e) {
            Toast()
        }
    }

    return (
        <Box className={classes.adminPremiumContainer}>
            <p className={classes.addProductsHeader}>{term('premium')}</p>
            {businessData?.paymentMethods?.length > 0 && <p>{`${term('payment_method')} : ${term(businessData?.paymentMethods[0].toLowerCase())}`}</p>}
            <FormControl style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <InputLabel id="demo-simple-select-label">{term('premium')}</InputLabel>
                <Select
                    value={premiumStatus}
                    label={term('premium_status')}
                    onChange={handleChange}
                >
                    <MenuItem value={STATUS.PUBLIC}>{term('approved')}</MenuItem>
                    <MenuItem value={STATUS.PRIVATE}>{term('private')}</MenuItem>
                    <MenuItem value={STATUS.PENDING_APPROVAL}>{term('pending_approval')}</MenuItem>
                </Select>
                <Button variant='contained' onClick={handleClick}>{term('send')}</Button>
            </FormControl>
        </Box>
    )
}

export default AdminPremiumTab