import React, { useState, useLayoutEffect, useEffect } from 'react'
import MapPicker from 'react-google-map-picker'
import term from '../../terms';
import { Button, FormLabel, Grid, Input } from '@material-ui/core';


const { REACT_APP_GOOGLE_API_KEY } = process.env

const DefaultZoom = 15;

const MapPick = ({ setFatherValue }) => {

    const [defaultLocation, setDefaultLocation] = useState({ lat: 0, lng: 0 });

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [show, setShow] = useState(false);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    useLayoutEffect(() => {
        let timer = setTimeout(() => setShow(true), 50);
        navigator.geolocation.getCurrentPosition((position) => {
            setDefaultLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        setFatherValue(pervState => ({ ...pervState, locationInfo: { type: "Custom", coordinates: [location.lat, location.lng] } }));
    }, [location])

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...defaultLocation });
        setZoom(DefaultZoom);
    }


    return (
        <>
            {show &&
                <>
                    <Grid container
                        direction='row'
                        alignItems="stretch" style={{ paddingBottom: 5 }}>
                        <Grid item xs={4}>
                            <FormLabel>{term('latitute')} -
                                <Input style={{ color: 'red' }} type='text' value={location.lat.toFixed(3)} disabled />
                            </FormLabel>
                        </Grid>
                        <Grid item xs={4}>
                            <FormLabel>{term('longitude')} -
                                <Input style={{ color: 'green' }} type='text' value={location.lng.toFixed(3)} disabled />
                            </FormLabel>
                        </Grid>
                        <Grid item xs={4}>
                            <FormLabel>{term('zoom')} -
                                <Input type='text' value={zoom} disabled />
                            </FormLabel>
                        </Grid>
                    </Grid>

                    <MapPicker
                        defaultLocation={defaultLocation}
                        zoom={zoom}
                        mapTypeId="roadmap"
                        style={{ width: '100%', height: '400px' }}
                        onChangeLocation={handleChangeLocation}
                        onChangeZoom={handleChangeZoom}
                        apiKey={REACT_APP_GOOGLE_API_KEY} />
                    <Button style={{ marginTop: 10 }} variant='outlined' onClick={handleResetLocation}>{term('reset_location')}</Button>
                </>
            }
        </>
    );
}

export default MapPick