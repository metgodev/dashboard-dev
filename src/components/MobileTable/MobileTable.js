import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { _get } from '../../API/service';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import MobileTableEntity from './MobileTableEntity';
import Toast from "../../utils/useToast";

function MobileTable({ display, action }) {

    const classes = useStyles()

    const { area } = useSelector(s => s.mainRememberReducer)

    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            try {
                setData([])
                const res = await _get(display, { $limit: 1000, areaId: area.id, isAnonymous: false })
                if (res) {
                    setData(res.data)
                }
            }
            catch (e) {
                Toast()
            }
        })();
    }, [area])

    return (
        <Box className={classes.container}>
            {data.length === 0 && <CircularProgress size={50} />}
            {data.length > 0 && data.map(unit => {
                return (
                    <MobileTableEntity entity={unit} onClick={action} display={display} />
                )
            })}
        </Box>
    )
}

export default MobileTable