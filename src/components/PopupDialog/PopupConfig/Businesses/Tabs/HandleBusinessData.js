import React, { useEffect, useState } from "react";
import term from "../../../../../terms";
import Form from "../../../../Form/Form";

export const initialState = (area, user) => {
  return (
    {
      status: "PENDING_APPROVAL",
      areaId: area?.id?.toString(),
      userId: user.id,
      openingHours: {},
    }
  )
}

export const Picker = {
  tagsIds: [],
  relevantTo: [
    { id: "INFANCY", title: term("infancy") },
    { id: "KIDS", title: term("kids") },
    { id: "YOUTH", title: term("youth") },
    { id: "ALL_FAMILY", title: term("all_family") },
    { id: "YOUNG_ADULTS", title: term("young_adults") },
    { id: "ADULTS", title: term("adults") },
    { id: "FAMALIES", title: term("families") },
    { id: "GOLDEN_AGE", title: term("golden_age") },
    { id: "WOMEN_ONLY", title: term("women_only") },
    { id: "MEN_ONLY", title: term("men_only") },
  ],
  reservations: [
    { value: "FREE", name: term("free") },
    { value: "FREE_WITH_RESERVATION", name: term("free_with_reservation") },
    { value: "PAYMENT", name: term("payment") },
    {
      value: "PAYMENT_WITH_RESERVATION",
      name: term("payment_with_reservation"),
    },
    { value: "ON_PLACE", name: term("on_place") },
  ],
  authorityId: [],
};

const initialDataFormTwo = {
  websitesUrl: "",
  phoneNumber: "",
  contactPersonName: "",
  contactPersonPhoneNumber: "",
  emailAddress: "",
  facebookPageUrl: "",
  instagramPageUrl: "",
  youtubePageUrl: "",
}
const initialDataFormThree = {
  locationName: "",
  point: [0, 0]
}

const initialDataFormOne = {
  name: "",
  authorityId: "",
  relevantTo: [],
  tags: [],
  openingHours: {
    sunday: { start: "00:00", end: "00:00" },
    monday: { start: "00:00", end: "00:00" },
    tuesday: { start: "00:00", end: "00:00" },
    wednesday: { start: "00:00", end: "00:00" },
    thursday: { start: "00:00", end: "00:00" },
    friday: { start: "00:00", end: "00:00" },
    saturday: { start: "00:00", end: "00:00" }
  },
  description: "",
  shortDescription: "",
  reservations: "",
  open24Hours: false,
  openOnWeekend: false,
  isKosher: false,
  isAccessable: false,
}

export const GetValuesToSendFirstPart = (values, allTags) => {

  let firstFormValues = {
    name: values.length || Object.keys(values).length ? values.hasOwnProperty('name') ? values.name : initialDataFormOne.name : initialDataFormOne.name,
    authorityId: values.length || Object.keys(values).length ? values.hasOwnProperty('authority') ? values.authority._id : values.hasOwnProperty('authorityId') ? values.authorityId : initialDataFormOne.authorityId : initialDataFormOne.authorityId,
    relevantTo: values.length || Object.keys(values).length ? values.hasOwnProperty('relevantTo') ? values.relevantTo : initialDataFormOne.relevantTo : initialDataFormOne.relevantTo,
    tagsIds: values.length || Object.keys(values).length ? values.hasOwnProperty('tags') ? getTagsForForm(values.tags, allTags) : initialDataFormOne.tags : initialDataFormOne.tags,
    openingHours: values.length || Object.keys(values).length ? values.hasOwnProperty('openingHours') ? values.openingHours : initialDataFormOne.openingHours : initialDataFormOne.openingHours,
    description: values.length || Object.keys(values).length ? values.hasOwnProperty('description') ? values.description : initialDataFormOne.description : initialDataFormOne.description,
    shortDescription: values.length || Object.keys(values).length ? values.hasOwnProperty('shortDescription') ? values.shortDescription : initialDataFormOne.shortDescription : initialDataFormOne.shortDescription,
    reservations: values.length || Object.keys(values).length ? values.hasOwnProperty('reservations') ? values.reservations : initialDataFormOne.reservations : initialDataFormOne.reservations,
    openOnWeekend: values.length || Object.keys(values).length ? values.hasOwnProperty('openOnWeekend') ? values.openOnWeekend : initialDataFormOne.openOnWeekend : initialDataFormOne.openOnWeekend,
    open24Hours: values.length || Object.keys(values).length ? values.hasOwnProperty('open24Hours') ? values.open24Hours : initialDataFormOne.open24Hours : initialDataFormOne.open24Hours,
    isKosher: values.length || Object.keys(values).length ? values.hasOwnProperty('isKosher') ? values.isKosher : initialDataFormOne.isKosher : initialDataFormOne.isKosher,
    isAccessable: values.length || Object.keys(values).length ? values.hasOwnProperty('isAccessable') ? values.isAccessable : initialDataFormOne.isAccessable : initialDataFormOne.isAccessable,
  }

  const [returnValues, setReturnValues] = useState(firstFormValues)

  useEffect(() => {
    setReturnValues(firstFormValues)
  }, [values])

  return returnValues
}

export const GetValuesToSendSecondPart = (values) => {

  let secondFormValues = {
    websitesUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('websitesUrl') ? values.websitesUrl : initialDataFormTwo.websitesUrl : initialDataFormTwo.websitesUrl,
    phoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('phoneNumber') ? values.phoneNumber : initialDataFormTwo.phoneNumber : initialDataFormTwo.phoneNumber,
    contactPersonName: values.length || Object.keys(values).length ? values.hasOwnProperty('contactPersonName') ? values.contactPersonName : initialDataFormTwo.contactPersonName : initialDataFormTwo.contactPersonName,
    contactPersonPhoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('contactPersonPhoneNumber') ? values.contactPersonPhoneNumber : initialDataFormTwo.contactPersonPhoneNumber : initialDataFormTwo.contactPersonPhoneNumber,
    emailAddress: values.length || Object.keys(values).length ? values.hasOwnProperty('emailAddress') ? values.emailAddress : initialDataFormTwo.emailAddress : initialDataFormTwo.emailAddress,
    facebookPageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('facebookPageUrl') ? values.facebookPageUrl : initialDataFormTwo.facebookPageUrl : initialDataFormTwo.facebookPageUrl,
    instagramPageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('instagramPageUrl') ? values.instagramPageUrl : initialDataFormTwo.instagramPageUrl : initialDataFormTwo.instagramPageUrl,
    youtubePageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('youtubePageUrl') ? values.youtubePageUrl : initialDataFormTwo.youtubePageUrl : initialDataFormTwo.youtubePageUrl,
  }

  const [returnValues, setReturnValues] = useState(secondFormValues)

  useEffect(() => {
    setReturnValues(secondFormValues)
  }, [values])

  return returnValues
}


export const GetValuesToSendThirdPart = (values) => {

  let thirdFormValues = {
    locationName: values.length || Object.keys(values).length ? values.hasOwnProperty('address') ? values.address : initialDataFormThree.locationName : initialDataFormThree.locationName,
    point: values.length || Object.keys(values).length ? values.hasOwnProperty('locationInfo') ? values.locationInfo.coordinates : initialDataFormThree.point : initialDataFormThree.point
  }

  const [returnValues, setReturnValues] = useState(thirdFormValues)

  useEffect(() => {
    setReturnValues(thirdFormValues)
  }, [values])

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

export const GetFormFields = (ModalInit, formData, areaSpecificData, handleValues, validateFirstFormPart, validateThirdFormPart, validateSecondFormPart, orientation, setValues) => {

  const [forms, setForms] = useState([])

  useEffect(() => {
    if (formData && areaSpecificData) {
      setForms(formsToSend)
    }
  }, [formData, areaSpecificData, orientation])

  let formsToSend =
    [
      {
        title: term("business_details"),
        optional: false,
        field:
          <Form
            fields={ModalInit.slice(0, 12)}
            data={formData}
            options={areaSpecificData}
            submitFunction={handleValues}
            validiationFunction={validateFirstFormPart}
            isPartOfStepper={true}
            orientation={orientation}
            setExternalValues={setValues}
          />
      },
      {
        title: term('contact_information'),
        optional: false,
        field:
          < Form
            fields={ModalInit.slice(12, 20)}
            data={formData}
            options={areaSpecificData}
            submitFunction={handleValues}
            validiationFunction={validateSecondFormPart}
            isPartOfStepper={true}
            orientation={orientation}
            setExternalValues={setValues}
          />,
      },
      {
        title: term('location'),
        optional: false,
        field:
          < Form
            fields={ModalInit.slice(20)}
            data={formData} //Send the data in the correct format
            options={areaSpecificData}
            submitFunction={handleValues}
            validiationFunction={validateThirdFormPart}
            isPartOfStepper={true}
            orientation={orientation}
            setExternalValues={setValues}
          />,
      }
    ]

  return forms
}