import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import term from "../../../../terms";
import Form from '../../../Form/Form'
import { UploadMediaTab } from "../../uploadMediaTab";
import useStyles from './styles'
import client from '../../../../API/metro'
import BACK_ROUTES from "../../../../data/back_routes";
import Toast from "../../../../utils/useToast";
import ROLES from "../../../../data/roles";

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
    { value: "FREE_WITH_RESERVATION", name: term("by_appointment") },
    { value: "PAYMENT", name: term("payment") },
    {
      value: "PAYMENT_WITH_RESERVATION",
      name: term("pre_sale_only"),
    },
    { value: "ON_PLACE", name: term("on_place") },
  ],
  authorityId: [],
  shipmentType: [
    { value: "FREE_SHIPPING", name: term("free_shipping") },
    { value: "PICKUP", name: term("pickup") },
    { value: "PAYED_SHIPPING", name: term("payed_shipping") },
    { value: "DROPOFF", name: term("dropoff") },
  ],
};

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
        title: term("details"),
        optional: false,
        field:
          <Form
            fields={ModalInit.slice(0, 15)}
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
            fields={ModalInit.slice(15, 24)}
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
            fields={ModalInit.slice(24)}
            data={formData}
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


export const GetProductFormFields = (productFields, formData, areaSpecificData, orientation, setValues, setStep, validateFirstProductTab, validateSecondProductTab) => {

  const [forms, setForms] = useState([])
  const classes = useStyles()

  useEffect(() => {
    if (formData !== null && areaSpecificData !== null) {
      setForms(fields)
    }
  }, [formData, orientation, areaSpecificData])

  const fields = [
    {
      title: term('details'),
      optional: false,
      field:
        <Form
          fields={productFields[0]}
          data={formData}
          options={areaSpecificData}
          submitFunction={setValues}
          validiationFunction={validateFirstProductTab}
          isPartOfStepper={true}
          orientation={orientation}
          setExternalValues={setValues}
        />
    },
    {
      title: term('description'),
      optional: false,
      field:
        <>
          <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>{term('add_specific_details_to_product')}</p>
          <span>{term('more_you_specify_more_sales_you_get')}</span>
          <Form
            fields={productFields[1]}
            data={formData}
            options={areaSpecificData}
            submitFunction={setValues}
            validiationFunction={validateSecondProductTab}
            isPartOfStepper={true}
            orientation={orientation}
            setExternalValues={setValues}
          />
        </>
    },
    {
      title: term('images'),
      optional: false,
      field:
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <UploadMediaTab
            tab='products'
            config={
              {
                mediaTypes: [
                  {
                    title: term('images'),
                    type: "image",
                    fileTypes: ["JPG", "PNG", "JPEG"],
                  },
                ],
                initialMediaType: {
                  title: term('images'),
                  type: "image",
                  fileTypes: ["JPG", "PNG", "JPEG"],
                }
              }
            }
            setExternalValues={setValues}
            externalValues={formData.galleryFileIds}
          />
          <Box className={
            orientation === 'rtl' ?
              classes.submitButtonLeft : classes.submitButtonRight
          }>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setStep(prev => prev + 1)}
            >
              {term('next')}
            </Button>
          </Box>
        </Box >
    }
  ]

  return forms
}

export const SubmitBusiness = async (area, user, values, permissions, type, handleClose) => {

  const configurationValues = initialState(area, user)

  const valuesToSend = {
    name: values.name,
    tagsIds: values.tags.map(tag => tag.value),
    description: values.description,
    authorityId: values.authorityId,
    address: values.address,
    locationName: values.locationName,
    phoneNumber: values.phoneNumber,
    contactPersonName: values.contactPersonName,
    contactPersonPhoneNumber: values.contactPersonPhoneNumber,
    websitesUrl: values.websitesUrl,
    emailAddress: values.emailAddress,
    relevantTo: values.relevantTo.map(value => value.value),
    facebookPageUrl: values.facebookPageUrl,
    instagramPageUrl: values.instagramPageUrl,
    youtubePageUrl: values.youtubePageUrl,
    openingHours: values.open24Hours ? {} : values.openingHours,
    open24Hours: values.open24Hours,
    openOnWeekend: values.openOnWeekend,
    isKosher: values.isKosher,
    isAccessable: values.isAccessable,
    shortDescription: values.shortDescription,
    areaId: configurationValues.areaId,
    userId: configurationValues.userId,
    status: configurationValues.status,
    whatsAppPhoneNumber: values.whatsAppPhoneNumber,
    locationInfo: {
      type: "Point",
      coordinates: values.locationInfo.coordinates
    },
    location: {
      type: "Point",
      coordinates: values.locationInfo.coordinates
    },
    reservations: values.reservations,
    approveContent: values.approveContent,
    isPremium: values.isPremium
  }
  try {
    if (permissions.edit) {

      let newUserDetails;

      if (type === "add") {
        const userBusinessRole = await client.service(BACK_ROUTES.USER_ROLES).find({ query: { userId: user.id, roleId: ROLES.BUSINESS_ROLE_ID } })
        if (userBusinessRole.data.length === 1) {
          const roleId = userBusinessRole.data[0]._id
          const businessRes = await client.service(BACK_ROUTES.BUSINESS).create(valuesToSend)
          await client.service(BACK_ROUTES.USER_ROLES).patch(roleId, { resourceIds: [...userBusinessRole.data[0].resourceIds, businessRes._id] })
          newUserDetails = await client.service(BACK_ROUTES.USERS).find({ query: { _id: user.id } })
        } else {
          await client.service(BACK_ROUTES.BUSINESS).create(valuesToSend)
          Toast()
        }
        handleClose(false)
      }
      else {
        await client.service("business").patch(values['_id'], valuesToSend)
        handleClose(false)
      }
      return ({ newUserDetails })
    }
    else {
      Toast(term('you_dont_have_permission'))
    }
  } catch (e) {
    console.log('modifyTab', e)
    Toast()
  }
}