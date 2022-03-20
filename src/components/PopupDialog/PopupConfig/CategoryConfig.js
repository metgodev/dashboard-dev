import React from 'react'
import MapPick from '../../MapPicker.js/MapPick';
import GoogleAutocomplete from '../../GoogleAutocomplete/GoogleAutocomplete'
import Calendar from '../../Calendar/Calendar'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TimeSelector from '../../TimePicker/TimePicker'
import { TextField, Autocomplete as MuiAutomplete, Button, Collapse, Grid, Switch, TextareaAutosize, MenuItem } from '@mui/material'
import term from '../../../terms'

let eventsPicker = {
  relevantTo: [{ value: 'INFANCY', name: term('infancy') },
  { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
  { value: 'ALL_FAMILY', name: term('all_family') },
  { value: 'GROUPS', name: term('groups') },
  { value: 'GOLDEN_AGE', name: term('golden_age') },],
  authorityId: [],
  categoryId: [],
  currency: [{ value: 'ILS', name: 'ILS' },
  { value: 'USD', name: 'USD' },
  { value: 'EUR', name: 'EUR' }]
};
let businessPicker = {
  relevantTo: [{ value: 'INFANCY', name: term('infancy') },
  { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
  { value: 'ALL_FAMILY', name: term('all_family') },
  { value: 'GROUPS', name: term('groups') },
  { value: 'GOLDEN_AGE', name: term('golden_age') }],
  authorityId: []
};
let pointsPicker = {
  relevantTo: [{ value: 'INFANCY', name: term('infancy') },
  { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
  { value: 'ALL_FAMILY', name: term('all_family') },
  { value: 'GROUPS', name: term('groups') },
  { value: 'GOLDEN_AGE', name: term('golden_age') },],
  authorityId: [],
  categoriesIds: [],
  prefferedSeason: [{ value: "SUMMER", name: term('summer') },
  { value: "WINTER", name: term('winter') },
  { value: "FALL", name: term('fall') },
  { value: "SPRING", name: term('spring') }],
  shady: [{ value: "FULL", name: term('full') },
  { value: "PARTIAL", name: term('partial') },
  { value: "NONE", name: term('none') }]
};
let authorityManagmentPicker = {
  areaId: []
};
let tagsManagmentPicker = {
  areaId: [],
};
let tracksPicker = {
  relevantTo: [{ value: 'INFANCY', name: term('infancy') },
  { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
  { value: 'ALL_FAMILY', name: term('all_family') },
  { value: 'GROUPS', name: term('groups') },
  { value: 'GOLDEN_AGE', name: term('golden_age') },],
  authorityId: [],
  pois: [{ value: 'something', name: 'something' }]
};
let TimePicker = [
  { day: term('sunday_opening'), type: 1, timeref: 'sunday' },
  { day: term('sunday_closing'), type: 2, timeref: 'sunday' },
  { day: term('monday_opening'), type: 1, timeref: 'monday' },
  { day: term('monday_closing'), type: 2, timeref: 'monday' },
  { day: term('tuesday_opening'), type: 1, timeref: 'tuesday' },
  { day: term('tuesday_closing'), type: 2, timeref: 'tuesday' },
  { day: term('wednesday_opening'), type: 1, timeref: 'wednesday' },
  { day: term('wednesday_closing'), type: 2, timeref: 'wednesday' },
  { day: term('thursday_opening'), type: 1, timeref: 'thursday' },
  { day: term('thursday_closing'), type: 2, timeref: 'thursday' },
  { day: term('friday_opening'), type: 1, timeref: 'friday' },
  { day: term('friday_closing'), type: 2, timeref: 'friday' },
  { day: term('saturday_opening'), type: 1, timeref: 'saturday' },
  { day: term('saturday_closing'), type: 2, timeref: 'saturday' },
];


function CategoryConfig({ checked, setChecked, removeDay, setTimes, title, id, field, rows, size, type, setValues, values, init, handleChange, tab, openDrop, setDateTime, maxRows, open }) {
  return (
    <>
      {type === 'MapPicker' && <MapPick setFatherValue={setValues} />}
      {type === 'googleAutocomplete' && <GoogleAutocomplete setFatherValue={setValues} field={field} />}
      {type === 'textfield' &&
        <TextField
          size={size}
          id={title}
          label={title}
          placeholder={title}
          multiline
          rows={rows}
          defaultValue={init? init[field] : ''}
          onChange={(e) => handleChange(e, field)}
          error={values[field] === ''}
        />}
      {type === 'picker' &&
        <TextField
          size={size}
          id="select-field"
          select
          label={title}
          value={values[field] || ''}
          onChange={(e) => handleChange(e, field)}
        >
          {tab === "businesses" && businessPicker[field].map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.name}
            </MenuItem>
          ))}
          {tab === "events" && eventsPicker[field].map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.name}
            </MenuItem>
          ))}
          {tab === "authorityManagment" && authorityManagmentPicker[field].map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.name}
            </MenuItem>
          ))}
          {tab === "points" && pointsPicker[field].map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.name}
            </MenuItem>
          ))}
          {tab === "tagsManagment" && tagsManagmentPicker[field].map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.name}
            </MenuItem>
          ))}
          {tab === "tracks" && tracksPicker[field].map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.name}
            </MenuItem>
          ))}
        </TextField>}
      {type === 'tagsPicker' &&
        <MuiAutomplete
          size={size}
          multiple
          id="tags-outlined"
          options={[]}
          getOptionLabel={(o) => o.title}
          filterSelectedOptions
          onChange={(e, val) => handleChange(e, field, val)}
          disabled={values[field]?.length > 4 || false}
          renderInput={(params) => (
            <TextField
              {...params}
              label={title}
              placeholder={title}
            />
          )}
        />}
      {type === 'timePicker' && tab !== "events" &&
        <>
          <Button variant="outlined" size={'large'} color="primary"
            onClick={openDrop} style={{ marginBottom: 10 }} >
            {open ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={1}>
              {TimePicker.map((s) => (
                <Grid item lg={6} md={6} sm={6} key={s.day}>
                  <TimeSelector label={s.day} type={s.type} times={values.openingHours[s.timeref] || null}
                    timeref={s.timeref} setTimes={setTimes} removeDay={removeDay} setChecked={setChecked} checked={checked} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </>}
      {type === 'timePicker' && tab === 'events' &&
        <TimeSelector label={title} setTime={setDateTime} field={field} />
      }
      {type === 'toggle' &&
        <Switch
          defaultValue={init? init[field] : false}
          checked={values[field] || false}
          onChange={(e) => handleChange(e, field, undefined, type)}
          inputprops={{ 'aria-label': title }}
        />
      }
      {type === 'datePicker' &&
        <Calendar type={2} setDateTwo={setDateTime} field={field} />
      }
      {type === 'textArea' &&
        <TextareaAutosize
          maxRows={maxRows}
          aria-label={title}
          defaultValue={init[field] || ''}
          fullWidth
        />
      }
    </>
  )
}

export default CategoryConfig