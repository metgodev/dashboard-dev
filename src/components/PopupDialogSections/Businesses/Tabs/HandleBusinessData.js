import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import term from "../../../../terms";
import Form from '../../../Form/Form'
import { UploadMediaTab } from "../../uploadMediaTab";
import useStyles from './styles'

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
            fields={ModalInit.slice(0, 14)}
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
            fields={ModalInit.slice(14, 23)}
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
            fields={ModalInit.slice(23)}
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


export const GetProductFormFields = (productFields, formData, areaSpecificData, orientation, setValues, setStep, validateFirstProductTab) => {

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
            validiationFunction={(values) => { }}
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