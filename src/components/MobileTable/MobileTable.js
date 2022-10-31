import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { _get } from '../../API/service';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import MobileTableEntity from './MobileTableEntity';
import Toast from "../../utils/useToast";
import BACK_ROUTES from '../../data/back_routes';
import client from '../../API/metro'

function MobileTable({ display, action }) {

    const classes = useStyles()

    const { area } = useSelector(s => s.mainRememberReducer)
    const tableChanged = useSelector(state => state.mainReducer.tableChanged)
    const userDetails = useSelector(s => s.userReducer.userDetails)

    const [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            if (userDetails.roles.length === 1) {
                setData([])
                return
            }
            try {
                const res =
                    userDetails.roles[1].resourceIds.length === 0 ?
                        await client.service(BACK_ROUTES[display.toUpperCase()]).find({ query: { $limit: 1000 } })
                        :
                        await client.service(BACK_ROUTES[display.toUpperCase()]).find({ query: { _id: { $limit: 1000, $in: userDetails.roles[1].resourceIds } } })
                if (res) {
                    setData(res.data)
                }
            }
            catch (e) {
                console.log(e)
                Toast()
            }
        })();
    }, [area, tableChanged])

    return (
        <Box className={classes.container}>
            {data === null && <CircularProgress size={50} />}
            {data !== null && data.length > 0 && data.map(unit => {
                return (
                    <MobileTableEntity entity={unit} onClick={action} display={display} />
                )
            })}
        </Box>
    )
}

export default MobileTable