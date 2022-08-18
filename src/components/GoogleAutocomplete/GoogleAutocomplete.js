import React, { useState } from "react";
import { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import term from "../../terms";
import { Typography } from "../Wrappers/Wrappers";
import toast from 'react-hot-toast';

const { REACT_APP_GOOGLE_API_KEY } = process.env

const Component = ({ setFatherValue, text }) => {

  const [value, setValue] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (value?.label !== undefined) {
          const res = await geocodeByAddress(value.label)
          if (res) {
            const latLang = await getLatLng(res[0])
            if (latLang) {
              setFatherValue(prev => ({ ...prev, locationInfo: { ...prev.locationInfo, coordinates: [latLang['lat'], latLang['lng']] }, point: [latLang['lat'], latLang['lng']], locationName: value.label, address: value.label }))
            }
          }
        }

      } catch (e) {
        console.log(e)
        errorToast(e)
      }
    })()
  }, [value])

  const errorToast = (e) => toast(term(e.toLowerCase()));

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={REACT_APP_GOOGLE_API_KEY}
        apiOptions={{
          language: 'iw',
          region: 'il'
        }}
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
      />
      {text &&
        <Typography size="md" style={{ paddingTop: '10px', paddingRight: '3px' }}>
          {text}
        </Typography>
      }
    </div>
  );
};

export default Component;
