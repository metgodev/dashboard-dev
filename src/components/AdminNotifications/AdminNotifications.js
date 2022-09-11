import React, { useState, useCallback, useEffect } from 'react'
import { Box, CircularProgress, IconButton, Modal } from '@material-ui/core'
import term from '../../terms'
import NotificationItem from './NotificationItem'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { set_admin_notification } from '../../REDUX/actions/main.actions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import useGetService from '../../hooks/useGetService';
import BACK_ROUTES from '../../data/back_routes';
import CACHED_DATA_ROUTES from '../../data/cached_data_routes';

function AdminNotifications({ open }) {

    const requestParams = { $limit: 10000, status: 'PENDING_APPROVAL', $select: ['status', 'isPremium'] }

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const businesses = useGetService(BACK_ROUTES.BUSINESS, CACHED_DATA_ROUTES.NOTIFICATION_BUSINESSES, requestParams)
    const events = useGetService(BACK_ROUTES.EVENTS, CACHED_DATA_ROUTES.NOTIFICATION_EVENTS, requestParams)
    const points = useGetService(BACK_ROUTES.POINTS, CACHED_DATA_ROUTES.NOTIFICATION_POINTS, requestParams)
    const tracks = useGetService(BACK_ROUTES.TRACKS, CACHED_DATA_ROUTES.NOTIFICATION_TRACKS, requestParams)
    const products = useGetService(BACK_ROUTES.PRODUCTS, CACHED_DATA_ROUTES.NOTIFICATION_PRODUCTS, requestParams)

    const getNumberOfBusinessesToApprovePremium = useCallback(() => {
        let number = 0
        if (businesses.data.length > 0) {
            businesses.data.forEach(business => {
                if (business.isPremium === "PENDING_APPROVAL") {
                    number++
                }
            })
        }
        return number
    }, [businesses])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!businesses.loading && !events.loading && !points.loading && !tracks.loading && !products.loading) {
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
                                {getNumberOfBusinessesToApprovePremium() > 0 &&
                                    <NotificationItem
                                        text={`${term('you_have')} ${getNumberOfBusinessesToApprovePremium()} ${term('businesses_requesting_premium')}`}
                                        onClick={() => buttonPressed('/businesses')}
                                    />
                                }
                                {businesses.data.length > 0 &&
                                    <NotificationItem
                                        text={`${term('you_have')} ${businesses.data.length} ${term('unapproved_businesses')}`}
                                        onClick={() => buttonPressed('/businesses')}
                                    />
                                }
                                {events.data.length > 0 &&
                                    <NotificationItem
                                        text={`${term('you_have')} ${events.data.length} ${term('unapproved_events')}`}
                                        onClick={() => buttonPressed('/events')}
                                    />}
                                {points.data.length > 0 &&
                                    <NotificationItem
                                        text={`${term('you_have')} ${points.data.length} ${term('unapproved_points')}`}
                                        onClick={() => buttonPressed('/locations')}
                                    />}
                                {tracks.data.length > 0 &&
                                    <NotificationItem
                                        text={`${term('you_have')} ${tracks.data.length} ${term('unapproved_tracks')}`}
                                        onClick={() => buttonPressed('/routes')}
                                    />}
                                {products.data.length > 0 &&
                                    <NotificationItem
                                        text={`${term('you_have')} ${products.data.length} ${term('unapproved_products')}`}
                                        onClick={() => buttonPressed('/products')}
                                    />}
                            </div>
                        }
                    </Box>
                </div>
            </Box>
        </Modal>
    )
}

export default AdminNotifications