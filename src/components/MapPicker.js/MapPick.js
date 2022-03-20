import React, { useState, useLayoutEffect } from 'react'
import MapPicker from 'react-google-map-picker'
import term from '../../terms';
import { Button, Grid } from '@material-ui/core';
import Notify from '../../pages/notifications/Notifications';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
const { innerWidth: windowWidth, innerHeight: windowHeight } = window

const { REACT_APP_GOOGLE_API_KEY } = process.env

const DefaultZoom = 15;

const MapPick = React.memo(({ setFatherValue }) => {
    const [defaultLocation, setDefaultLocation] = useState({ lat: 0, lng: 0 });
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [palceChoosed, setPalceChoosed] = useState(0);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    const waitForMapToLoad = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setLoading(false);
        setShow(true);
    }

    useLayoutEffect(() => {
        waitForMapToLoad();
        navigator.geolocation.getCurrentPosition((position) => {
            setDefaultLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
    }, [])

    const setPlace = () => {
        setFatherValue(pervState => ({ ...pervState, locationInfo: { type: "Custom", coordinates: [location.lat, location.lng] } }))
        setPalceChoosed(location.lat + location.lng);
    }

    const handleChangeZoom = (newZoom) => setZoom(newZoom);
    const handleResetLocation = () => {
        setDefaultLocation({ ...defaultLocation });
        setZoom(DefaultZoom);
    }

    return (
        <>
            {show &&
                <>
                    {loading ?
                        <Box style={{
                            position: 'absolute',
                            top: '60%',
                            left: '45%',
                            transform: 'translate(-50%, -50%)',
                        }}>
                            <CircularProgress />
                        </Box>
                        :
                        <>
                            <MapPicker
                                defaultLocation={defaultLocation}
                                zoom={zoom}
                                mapTypeId="roadmap"
                                mapTypeIds={['roadmap', 'satellite', 'hybrid', 'terrain']}
                                style={{ width: '100%', height: windowHeight * 0.5 }}
                                onChangeLocation={handleChangeLocation}
                                onChangeZoom={handleChangeZoom}
                                apiKey={REACT_APP_GOOGLE_API_KEY} />
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button style={{ marginTop: 10, width: '100%' }} variant='outlined' onClick={handleResetLocation}>{term('reset_location')}</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button style={{ marginTop: 10, width: '100%' }} variant='outlined' onClick={setPlace}>{term('set_location')}</Button>
                                </Grid>
                            </Grid>
                            {palceChoosed !== 0 && <Notify text={term('location_set')} id={palceChoosed} type='success' />}
                        </>
                    }
                </>
            }
        </>
    );
})


export default MapPick