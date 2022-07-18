import React, { useState } from "react";
import { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useSelector } from "react-redux";
import term from "../../terms";

const { REACT_APP_GOOGLE_API_KEY } = process.env

const Component = ({ setFatherValue }) => {

  const [value, setValue] = useState(null);
  const { lang } = useSelector((s) => s.mainRememberReducer);

  useEffect(() => {
    if (value !== null) {
      geocodeByAddress(value.label)
        .then(locationInfo => getLatLng(locationInfo[0]))
        .then(latLang => {
          setFatherValue(prev => ({ ...prev, locationInfo: { ...prev.locationInfo, coordinates: [latLang['lat'], latLang['lng']] }, point: [latLang['lat'], latLang['lng']], locationName: value.label, address: value.label }))
        })
    }
  }, [value])

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={REACT_APP_GOOGLE_API_KEY}
        selectProps={{
          onChange: setValue,
          styles: {
            input: (provided) => ({
              ...provided,
              height: '47px',
            }),
          },
          placeholder: term("search_for_a_place"),
        }}
        apiOptions={{ language: lang }}
      />
    </div>
  );
};

export default Component;
