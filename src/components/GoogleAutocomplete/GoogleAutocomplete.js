import React, { useState } from 'react';
import { useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useSelector } from 'react-redux';

const { REACT_APP_GOOGLE_API_KEY } = process.env

const Component = ({ setFatherValue, field }) => {
    const [value, setValue] = useState(null);
    const { lang } = useSelector(s => s.mainRememberReducer);


    useEffect(() => {
        if (!value?.label) return;
        geocodeByAddress(value.label)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => setFatherValue(pervState =>
                ({ ...pervState, [field]: value.label, location: { type: "Point", coordinates: [lat, lng] }, locationInfo: value.value })));
    }, [value])

    return (<div>
        <GooglePlacesAutocomplete
            apiKey={REACT_APP_GOOGLE_API_KEY}
            selectProps={{
                value,
                onChange: setValue,
            }}
            apiOptions={{ language: lang }}

        />
    </div>)

};

export default Component;
