import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const DEFAULT_LOCATION = { lat: 32.0713, lng: 34.7886 }
const DEFAULT_ZOOM = 15;
const { innerWidth: windowWidth, innerHeight: windowHeight } = window
const DEFAULT_CONTANER_STYLE = { width: windowWidth, height: windowHeight / 2 }

const MapPick = ({ point, containerStyle, markers, setFatherValue, zoom, isLoaded }) => {

    const [myMap, setMyMap] = useState(null)
    const [location, setLocation] = useState(DEFAULT_LOCATION);
    const [marker, setMarker] = useState(null)
    const [geocoder, setGeocoder] = useState(null)

    useEffect(() => {
        if (window.google && geocoder === null) {
            setGeocoder(new window.google.maps.Geocoder())
        }
        if (point !== undefined) {
            setLocation({ lat: point[0], lng: point[1] })
            if (setFatherValue !== undefined) {
                setMarker({ lat: point[0], lng: point[1] })
            }
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                if (setFatherValue !== undefined) {
                    setMarker({ lat: position.coords.latitude, lng: position.coords.longitude })
                }
            });
        }
    }, [point, window.google])

    const onLoad = useCallback((map) => {
        setMyMap(map)
    }, [])

    const onUnmount = useCallback((map) => {
        setMyMap(null)
    }, [])

    const handleClick = (event) => {
        const newLat = event.latLng.lat()
        const newLng = event.latLng.lng()
        if (setFatherValue !== undefined) {
            geocoder.geocode({ location: { lat: newLat, lng: newLng } }).then((res) => {
                setFatherValue(prev => ({ ...prev, locationName: res.results[0]['formatted_address'], address: res.results[0]['formatted_address'] }))
            })
            setFatherValue(prev => ({ ...prev, locationInfo: { ...prev.locationInfo, coordinates: [newLat, newLng] } }))
        }
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle ? containerStyle : DEFAULT_CONTANER_STYLE}
            center={location}
            zoom={zoom ? zoom : DEFAULT_ZOOM}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleClick}
        >
            {markers &&
                markers.map((marker, index) => {
                    return (
                        <Marker
                            icon={{
                                url: marker.icon,
                                scaledSize: new window.google.maps.Size(30, 40)
                            }}
                            key={marker.location[0] + index}
                            position={{ lat: marker.location[0], lng: marker.location[1] }}
                        />
                    )
                })
            }
            {marker && <Marker position={{ lat: point[0], lng: point[1] }} />}
        </GoogleMap>
    ) : <></>
}

export default React.memo(MapPick)