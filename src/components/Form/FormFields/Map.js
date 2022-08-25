import React from 'react'
import MapPick from '../../MapPicker.js/MapPick'

function Map({ data, setExternalValues, isLoaded }) {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <MapPick
                setFatherValue={setExternalValues}
                point={data["point"]}
                containerStyle={{ width: '90vw', height: '50vh' }}
                isLoaded={isLoaded}
            />
        </div>
    )
}

export default Map