import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { TextField, Select, Checkboxes, Autocomplete, TimePicker as MuiRffTimePicker, DatePicker } from "mui-rff";
import { MenuItem, Checkbox as MuiCheckbox } from "@material-ui/core";
import { Box, Button, Grid, TextareaAutosize } from "@mui/material";
import GoogleAutocomplete from "../GoogleAutocomplete/GoogleAutocomplete";
import MapPick from "../MapPicker.js/MapPick";
import useStyles from "./styles";
import TimePicker from '../NewTimePicker/TimePicker'
import term from "../../terms";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useJsApiLoader } from '@react-google-maps/api';

const MyForm = React.memo(({ fields, data, options, submitFunction, validiationFunction, isPartOfStepper, orientation, setExternalValues }) => {

  let classes = useStyles()

  const { REACT_APP_GOOGLE_API_KEY } = process.env
  const { isLoaded } = useJsApiLoader({ libraries: ["places"], id: 'google-map-script', googleMapsApiKey: REACT_APP_GOOGLE_API_KEY })

  const [resizableText, setResizableText] = useState("")
  const [times, setTimes] = useState({})

  useEffect(() => {
    setResizableText(data['description'])
    setTimes(data.openingHours)
  }, [data])

  return (
    <>
      {
        <Form
          onSubmit={(values) => {
            submitFunction({ ...values, description: resizableText, openingHours: times })
          }}
          initialValues={data}
          validate={validiationFunction}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} noValidate className={classes.form}>
              <Grid container spacing={2} className={classes.gridContainer}>
                {fields.map(({ type, field, title, size }) => (
                  <Grid key={field} item xs={size === 'small' ? 3 : size === 'medium' ? 6 : 12} className={type === 'googleAutocomplete' ? '' : classes.item}>
                    {type === "textfield" && (
                      <TextField
                        label={title}
                        name={field}
                      />
                    )}
                    {type === "number" && (
                      <TextField
                        label={title}
                        name={field}
                        type={'number'}
                      />
                    )}
                    {type === "picker" && (
                      <Select label={title} name={field} required={true}>
                        {options && options[field].map((item) => (
                          <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    )}
                    {type === 'datePicker' &&
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label={title}
                          name={field}
                          inputFormat={'dd/MM/yyyy'}
                        />
                      </LocalizationProvider >
                    }
                    {type === 'timePicker' &&
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MuiRffTimePicker
                          label={title}
                          name={field}
                          closeOnSelect={true}
                        />
                      </LocalizationProvider>
                    }
                    {type === "tagsPicker" && options[field].length > 0 && values[field] && (
                      <Autocomplete
                        label={title}
                        name={field}
                        multiple={true}
                        variant="outlined"
                        options={
                          options[field].map((item) => ({
                            label: item.title,
                            value: item.id,
                          }))
                        }
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => option.label}
                        disableCloseOnSelect={true}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <MuiCheckbox
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.label}
                          </li>
                        )}
                      />
                    )}
                    {type === "checkbox" && (
                      <Checkboxes
                        label={title}
                        key={field}
                        name={field}
                        data={{
                          label:
                            values[field] === false ? term('no') : term('yes'),
                          value: values[field],
                        }}
                      />
                    )}
                    {type === "googleAutocomplete" && (
                      <GoogleAutocomplete
                        setFatherValue={setExternalValues}
                      />
                    )}
                    {type === "MapPicker" && (
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <MapPick
                          setFatherValue={setExternalValues}
                          point={data["point"]}
                          containerStyle={{ width: '90vw', height: '50vh' }}
                          isLoaded={isLoaded}
                        />
                      </div>
                    )}
                    {type === 'timesPicker' && (
                      <TimePicker
                        title={title}
                        realData={times}
                        setTimes={(newTimes) => {
                          setTimes(newTimes)
                        }}
                      />
                    )}
                    {type === 'textAreaSizeable' && (
                      <TextareaAutosize
                        aria-label={field}
                        style={{ height: '56px', fontSize: '16px', paddingTop: '10px', overflowY: 'hidden' }}
                        className={classes.resizeTextField}
                        placeholder={term('description')}
                        value={resizableText}
                        minRows={3}
                        onChange={(e) => { setResizableText(e.target.value) }}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
              <Box className={
                orientation === 'rtl' ?
                  classes.submitButtonLeft : classes.submitButtonRight
              }>
                <Button variant="contained" type="submit">{isPartOfStepper ? term('next') : term('submit')}</Button>
              </Box>
            </form >
          )}
        />
      }
    </>
  );
});

export default MyForm;