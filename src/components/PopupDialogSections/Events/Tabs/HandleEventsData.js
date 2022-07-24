import { useEffect, useState } from "react";
import term from "../../../../terms";
import Form from '../../../Form/Form'


const date = new Date()

export const initialState = (area, user) => {
    return (
        {
            status: 'PENDING_APPROVAL',
            areaId: area?.id?.toString(),
            userId: user.id,
            currency: 'ILS',
        }
    )
}

export const Picker = {
    tagsIds: [],
    relevantTo: [
        { id: 'INFANCY', title: term('infancy') },
        { id: 'KIDS', title: term('kids') },
        { id: 'YOUTH', title: term('youth') },
        { id: 'ALL_FAMILY', title: term('all_family') },
        { id: 'YOUNG_ADULTS', title: term('young_adults') },
        { id: 'ADULTS', title: term('adults') },
        { id: 'FAMALIES', title: term('families') },
        { id: 'GOLDEN_AGE', title: term('golden_age') },
        { id: 'WOMEN_ONLY', title: term('women_only') },
        { id: 'MEN_ONLY', title: term('men_only') },
    ],
    reservations: [
        { value: 'FREE', name: term('free') },
        { value: 'FREE_WITH_RESERVATION', name: term('free_with_reservation') },
        { value: 'PAYMENT', name: term('payment') },
        { value: 'PAYMENT_WITH_RESERVATION', name: term('payment_with_reservation') },
        { value: 'ON_PLACE', name: term('on_place') },
    ],
    authorityId: [],
    currency: [{ value: 'ILS', name: 'ILS' },
    { value: 'USD', name: 'USD' },
    { value: 'EUR', name: 'EUR' }]
};

export const GetFormFields = (ModalInit, formData, areaSpecificData, handleValues, validateFirstFormPart, validateThirdFormPart, validateSeconsFormPart, orientation, setValues) => {

    const [forms, setForms] = useState([])

    useEffect(() => {
        if (formData && areaSpecificData) {
            setForms(formToSend)
        }
    }, [formData, areaSpecificData, orientation])

    let formToSend = [
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
                    fields={ModalInit.slice(15, 19)}
                    data={formData}
                    options={areaSpecificData}
                    submitFunction={handleValues}
                    validiationFunction={validateSeconsFormPart}
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
                    fields={ModalInit.slice(19)}
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