import React, { useState, useCallback, useEffect } from 'react'
import { Box, CircularProgress, IconButton, Modal } from '@material-ui/core'
import term from '../../terms'
import NotificationItem from './NotificationItem'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { set_admin_notification } from '../../REDUX/actions/main.actions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function AdminNotifications({ open, businesses, events, points, tracks, products }) {

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [numberOfBusinesses, setNumberOfBusinesses] = useState(0)
    const [numberOfEvents, setNumberOfEvents] = useState(0)
    const [numberOfPoints, setNumberOfPoints] = useState(0)
    const [numberOfTracks, setNumberOfTracks] = useState(0)
    const [numberOfProducts, setNumberOfProducts] = useState(0)

    useEffect(() => {
        if (!businesses.loading && !events.loading && !points.loading && !tracks.loading && !products.loading) {
            setNumberOfBusinesses(businesses.data.filter(business => business.status === 'PENDING_APPROVAL').length)
            setNumberOfEvents(events.data.filter(event => event.status === 'PENDING_APPROVAL').length)
            setNumberOfPoints(points.data.filter(point => point.status === 'PENDING_APPROVAL').length)
            setNumberOfTracks(tracks.data.filter(track => track.status === 'PENDING_APPROVAL').length)
            setNumberOfProducts(products.data.filter(product => product.status === 'PENDING_APPROVAL').length)
            setLoading(false)
        }
    }, [businesses, events, points, tracks, products])

    const handleClose = useCallback(() => {
        dispatch(set_admin_notification(false))
    }, [])

    const buttonPressed = useCallback((path) => {
        dispatch(set_admin_notification(false))
        navigate(path)
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderRadius: '10px', flexDirection: 'column', paddingTop: '40px', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40vw', height: '70%', backgroundColor: 'white' }}>
                    <IconButton onClick={handleClose} style={{ position: 'absolute', top: 10, left: 10 }}>
                        < CloseOutlinedIcon />
                    </IconButton>
                    <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{term('notifications')}</p>
                    <Box style={{ width: '100%', height: '100%', padding: '5px', display: 'flex', justifyContent: "center", alignItems: 'center', }}>
                        {loading ?
                            <CircularProgress size={50} />
                            :
                            <div>
                                <NotificationItem
                                    text={`${term('you_have')} ${numberOfBusinesses} ${term('unapproved_businesses')}`}
                                    onClick={() => buttonPressed('/businesses')}
                                />
                                <NotificationItem
                                    text={`${term('you_have')} ${numberOfEvents} ${term('unapproved_events')}`}
                                    onClick={() => buttonPressed('/events')}
                                />
                                <NotificationItem
                                    text={`${term('you_have')} ${numberOfPoints} ${term('unapproved_points')}`}
                                    onClick={() => buttonPressed('/locations')}
                                />
                                <NotificationItem
                                    text={`${term('you_have')} ${numberOfTracks} ${term('unapproved_tracks')}`}
                                    onClick={() => buttonPressed('/routes')}
                                />
                                <NotificationItem
                                    text={`${term('you_have')} ${numberOfProducts} ${term('unapproved_products')}`}
                                    onClick={() => buttonPressed('/products')}
                                />
                            </div>
                        }
                    </Box>
                </div>
            </Box>
        </Modal>
    )
}

export default AdminNotifications