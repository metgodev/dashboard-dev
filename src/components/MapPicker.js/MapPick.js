import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { sendPositionToInfoWindow } from './MapPickHelpers'
import { DEFAULT_LOCATION, DEFAULT_ZOOM, DEFAULT_CONTANER_STYLE } from './config';
import Toast from '../../utils/useToast';

const MapPick = ({ point, containerStyle, markers, setFatherValue, initialZoom, isLoaded, infoWindow, setInfoWindow, selectedCategory }) => {

    const [myMap, setMyMap] = useState(null)
    const [location, setLocation] = useState(DEFAULT_LOCATION);
    const [marker, setMarker] = useState(null)
    const [geocoder, setGeocoder] = useState(null)
    const [zoom, setZoom] = useState(initialZoom ? initialZoom : DEFAULT_ZOOM)

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

    const getFormattedAddress = (res) => {
        return res.results[0].address_components.filter(item => !item.types.includes('country') && !item.types.includes('plus_code'))
            .map(item => item.long_name).join(', ')
    }



    const handleClick = async (event) => {
        if (setInfoWindow !== undefined) {
            setInfoWindow(null)
        }
        const newLat = event.latLng.lat()
        const newLng = event.latLng.lng()
        if (setFatherValue !== undefined) {
            try {
                const res = await geocoder.geocode({ location: { lat: newLat, lng: newLng } })
                if (res) {
                    setFatherValue(prev => ({ ...prev, locationInfo: { ...prev.locationInfo, coordinates: [newLat, newLng] }, locationName: getFormattedAddress(res), address: res.results[0]['formatted_address'] }))
                }
            } catch (e) {
                console.log('mapPick', e)
                Toast(e?.code?.toLowerCase())
            }
        }
    }

    const renderMarkers = useCallback(
        markers && window.google && markers.map((marker, index) => {
            return (
                <Marker
                    icon={{
                        url: marker.icon,
                        scaledSize: new window.google.maps.Size(20, 30),
                        scale: 0.1,
                    }}
                    key={marker.location[0] + index}
                    position={{ lat: marker.location[0], lng: marker.location[1] }}
                    onClick={
                        () => {
                            sendPositionToInfoWindow({ lat: marker.location[0], lng: marker.location[1] }, marker.name, marker.description, setInfoWindow)
                        }
                    }
                />
            )
        })
        , [selectedCategory, window.google])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle ? containerStyle : DEFAULT_CONTANER_STYLE}
            center={location}
            zoom={initialZoom ? initialZoom : DEFAULT_ZOOM}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleClick}
            onZoomChanged={() => {
                if (myMap !== null) {
                    setZoom(myMap.getZoom())
                }
            }}
        >
            {
                renderMarkers
            }
            {marker && <Marker position={{ lat: point[0], lng: point[1] }} />}
            {infoWindow &&
                <InfoWindow
                    position={{ lat: infoWindow.position.lat + (0.14 / (Math.pow(2, zoom - 8))), lng: infoWindow.position.lng }}
                    onCloseClick={() => setInfoWindow(null)}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{ margin: '5px' }}>{infoWindow.title}</h3>
                        <p style={{ margin: 0 }}>{infoWindow.description}</p>
                    </div>
                </InfoWindow>
            }
        </GoogleMap>
    ) : <></>
}

export default React.memo(MapPick)