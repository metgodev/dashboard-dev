import React, { useEffect, useState } from 'react'
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
      {type === 'googleAutocomplete' && <GoogleAutocomplete setFatherValue={setValues} field={field} />}
      {type === 'textfield' &&
        <TextField
          size={size}
          id={title}
          label={title}
          placeholder={title}
          multiline
          rows={rows}
          defaultValue={init ? init[field] : ''}
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
          defaultValue={init ? init[field] : false}
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




const date = new Date()

const initialData = {
  name: "",
  authority: "",
  tags: [],
  description: "",
  shortDescription: "",
  isAccessable: false,
  activitiesInPlace: [],
  exclusiveFor: [],
  shady: "",
  arrivalRecommendations: "",
  tip: "",
  prefferedSeason: "",
  inPlace: [],
  relevantTo: [],
  phoneNumber: "",
  websitesUrl: "",
  locationName: "",
  point: [32.109333, 34.855499],
  free: false,
  openHour: date.toISOString(),
  endDate: date.toISOString(),
  startDate: date.toISOString(),
  price: 0,
  online: false,
  onlineMeetingURL: "",
  reservations: [],
  reservationCenterPhone: "",
  reservationCenterEmail: "",
  registrationLink: "",
  openingHours: {
    sunday: { start: "00:00", end: "00:00" },
    monday: { start: "00:00", end: "00:00" },
    tuesday: { start: "00:00", end: "00:00" },
    wednesday: { start: "00:00", end: "00:00" },
    thursday: { start: "00:00", end: "00:00" },
    friday: { start: "00:00", end: "00:00" },
    saturday: { start: "00:00", end: "00:00" }
  },
  open24Hours: false,
  openOnWeekend: false,
  isKosher: false,
  contactPersonName: "",
  contactPersonPhoneNumber: "",
  emailAddress: "",
  facebookPageUrl: "",
  instagramPageUrl: "",
  youtubePageUrl: "",
}



export const GetValuesForForm = (values, allTags) => {

  useEffect(() => {
    setReturnValues(valuesForForm)
  }, [values])

  const [returnValues, setReturnValues] = useState("")

  let valuesForForm = {
    name: values.length || Object.keys(values).length ? values.hasOwnProperty('name') ? values.name : initialData.name : initialData.name,
    authorityId: values.length || Object.keys(values).length ? values.hasOwnProperty('authority') ? values.authority._id : initialData.authority : initialData.authority,
    relevantTo: values.length || Object.keys(values).length ? values.hasOwnProperty('relevantTo') ? values.relevantTo : initialData.relevantTo : initialData.relevantTo,
    tagsIds: values.length || Object.keys(values).length ? values.hasOwnProperty('tags') ? values.hasOwnProperty('tagsIds') ? values.tagsIds : getTagsForForm(values.tags, allTags) : initialData.tags : initialData.tags,
    openingHours: values.length || Object.keys(values).length ? values.hasOwnProperty('openingHours') ? values.openingHours : initialData.openingHours : initialData.openingHours,
    description: values.length || Object.keys(values).length ? values.hasOwnProperty('description') ? values.description : initialData.description : initialData.description,
    shortDescription: values.length || Object.keys(values).length ? values.hasOwnProperty('shortDescription') ? values.shortDescription : initialData.shortDescription : initialData.shortDescription,
    reservations: values.length || Object.keys(values).length ? values.hasOwnProperty('reservations') ? values.reservations : initialData.reservations : initialData.reservations,
    openOnWeekend: values.length || Object.keys(values).length ? values.hasOwnProperty('openOnWeekend') ? values.openOnWeekend : initialData.openOnWeekend : initialData.openOnWeekend,
    open24Hours: values.length || Object.keys(values).length ? values.hasOwnProperty('open24Hours') ? values.open24Hours : initialData.open24Hours : initialData.open24Hours,
    isKosher: values.length || Object.keys(values).length ? values.hasOwnProperty('isKosher') ? values.isKosher : initialData.isKosher : initialData.isKosher,
    isAccessable: values.length || Object.keys(values).length ? values.hasOwnProperty('isAccessable') ? values.isAccessable : initialData.isAccessable : initialData.isAccessable,
    phoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('phoneNumber') ? values.phoneNumber : initialData.phoneNumber : initialData.phoneNumber,
    contactPersonName: values.length || Object.keys(values).length ? values.hasOwnProperty('contactPersonName') ? values.contactPersonName : initialData.contactPersonName : initialData.contactPersonName,
    contactPersonPhoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('contactPersonPhoneNumber') ? values.contactPersonPhoneNumber : initialData.contactPersonPhoneNumber : initialData.contactPersonPhoneNumber,
    emailAddress: values.length || Object.keys(values).length ? values.hasOwnProperty('emailAddress') ? values.emailAddress : initialData.emailAddress : initialData.emailAddress,
    facebookPageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('facebookPageUrl') ? values.facebookPageUrl : initialData.facebookPageUrl : initialData.facebookPageUrl,
    instagramPageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('instagramPageUrl') ? values.instagramPageUrl : initialData.instagramPageUrl : initialData.instagramPageUrl,
    youtubePageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('youtubePageUrl') ? values.youtubePageUrl : initialData.youtubePageUrl : initialData.youtubePageUrl,
    locationName: values.length || Object.keys(values).length ? values.hasOwnProperty('address') ? values.address : initialData.locationName : initialData.locationName,
    point: values.length || Object.keys(values).length && values.hasOwnProperty('locationInfo') && values.locationInfo.hasOwnProperty("coordinates") ? values.locationInfo.coordinates : initialData.point,
    free: values.length || Object.keys(values).length ? values.hasOwnProperty('free') ? values.free : initialData.free : initialData.free,
    openHour: values.length || Object.keys(values).length ? values.hasOwnProperty('openHour') ? values.openHour.length < 7 ? new Date(values.openHour + ' 2016-01-01') : values.openHour : initialData.openHour : initialData.openHour,
    endDate: values.length || Object.keys(values).length ? values.hasOwnProperty('endDate') ? values.endDate : initialData.endDate : initialData.endDate,
    startDate: values.length || Object.keys(values).length ? values.hasOwnProperty('startDate') ? values.startDate : initialData.startDate : initialData.startDate,
    price: values.length || Object.keys(values).length ? values.hasOwnProperty('price') ? values.price : initialData.price : initialData.price,
    online: values.length || Object.keys(values).length ? values.hasOwnProperty('online') ? values.online : initialData.online : initialData.online,
    onlineMeetingURL: values.length || Object.keys(values).length ? values.hasOwnProperty('onlineMeetingURL') ? values.onlineMeetingURL : initialData.onlineMeetingURL : initialData.onlineMeetingURL,
    reservationCenterPhone: values.length || Object.keys(values).length ? values.hasOwnProperty('reservationCenterPhone') ? values.reservationCenterPhone : initialData.reservationCenterPhone : initialData.reservationCenterPhone,
    reservationCenterEmail: values.length || Object.keys(values).length ? values.hasOwnProperty('reservationCenterEmail') ? values.reservationCenterEmail : initialData.reservationCenterEmail : initialData.reservationCenterEmail,
    websitesUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('websitesUrl') && values.websitesUrl !== undefined && values.websitesUrl[0] !== undefined ? values.websitesUrl[0] : initialData.websitesUrl : initialData.websitesUrl,
    registrationLink: values.length || Object.keys(values).length ? values.hasOwnProperty('registrationLink') ? values.registrationLink : initialData.registrationLink : initialData.registrationLink,
    activitiesInPlace: values.length || Object.keys(values).length ? values.hasOwnProperty('activitiesInPlace') ? values.activitiesInPlace : initialData.activitiesInPlace : initialData.activitiesInPlace,
    exclusiveFor: values.length || Object.keys(values).length ? values.hasOwnProperty('exclusiveFor') ? values.exclusiveFor : initialData.exclusiveFor : initialData.exclusiveFor,
    shady: values.length || Object.keys(values).length ? values.hasOwnProperty('shady') ? values.shady : initialData.shady : initialData.shady,
    arrivalRecommendations: values.length || Object.keys(values).length ? values.hasOwnProperty('arrivalRecommendations') ? values.arrivalRecommendations : initialData.arrivalRecommendations : initialData.arrivalRecommendations,
    tip: values.length || Object.keys(values).length ? values.hasOwnProperty('tip') ? values.tip : initialData.tip : initialData.tip,
    inPlace: values.length || Object.keys(values).length ? values.hasOwnProperty('inPlace') ? values.inPlace : initialData.inPlace : initialData.inPlace,
    prefferedSeason: values.length || Object.keys(values).length ? values.hasOwnProperty('prefferedSeason') ? values.prefferedSeason : initialData.prefferedSeason : initialData.prefferedSeason,
  }



  return returnValues
}


const getTagsForForm = (recievedTags, allTags) => {
  if (recievedTags.length > 0 && allTags.length > 0) {
    let selectedTags = recievedTags.map(item => (
      item._id
    ))
    selectedTags = allTags.filter(item => (
      selectedTags.includes(item.id)
    ))
    selectedTags = selectedTags.map(item => {
      return item.id
    })
    return selectedTags
  }
  return []
}

export const getTagIdsToSend = (tagCategoryIds, areaSpecificData) => {
  let x = areaSpecificData.tagsIds.filter(item => tagCategoryIds.includes(item.id))
  x = x.map(item => {
    return item.idToSend
  })
  return x
}