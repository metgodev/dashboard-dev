import React, { useState } from "react";
import { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import term from "../../terms";
import Toast from "../../utils/useToast";
import { Typography } from "../Wrappers/Wrappers";
import { apiOptions, textStyle } from "./config";

const { REACT_APP_GOOGLE_API_KEY } = process.env

const Component = ({ setFatherValue, text, disabled }) => {

  const [value, setValue] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (value?.label !== undefined) {
          const res = await geocodeByAddress(value.label)
          if (res) {
            const latLang = await getLatLng(res[0])
            if (latLang) {
              setFatherValue(prev => ({ ...prev, locationInfo: { ...prev.locationInfo, coordinates: [latLang.lat, latLang.lng] }, point: [latLang.lat, latLang.lng], locationName: value.label, address: value.label }))
            }
          }
        }

      } catch (e) {
        console.log('googleAutocomplete', e)
        Toast(e.toLowerCase())
      }
    })()
  }, [value])

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={REACT_APP_GOOGLE_API_KEY}
        apiOptions={apiOptions}
        disabled={disabled}
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
        <Typography size="md" style={textStyle}>
          {text}
        </Typography>
      }
    </div>
  );
};

export default Component;
