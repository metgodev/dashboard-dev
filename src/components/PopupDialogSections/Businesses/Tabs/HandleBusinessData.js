import React, { useEffect, useState } from "react";
import term from "../../../../terms";
import Form from '../../../Form/Form'

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