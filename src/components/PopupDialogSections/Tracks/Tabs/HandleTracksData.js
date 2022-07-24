import { useEffect, useState } from "react";
import term from "../../../../terms";
import Form from '../../../Form/Form'

export const initialState = (area, user) => {
    return (
        {
            status: 'PENDING_APPROVAL',
            userId: user.id,
            areaId: area?.id?.toString(),
        }
    )
}

export const Picker = {
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
    authorityId: [],
    pois: [{ value: 'something', name: 'something' }],
    tagsIds: []
};

export const GetFormFields = (ModalInit, formData, areaSpecificData, handleValues, validateFirstFormPart, validateThirdFormPart, validateSecondFormPart, orientation, setValues) => {

    const [forms, setForms] = useState([])

    useEffect(() => {
        if (formData && areaSpecificData) {
            setForms(formToSend)
        }
    }, [formData, areaSpecificData, orientation])

    let formToSend =
        [
            {
                title: term("details"),
                optional: false,
                field:
                    <Form
                        fields={ModalInit.slice(0, 9)}
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
                title: term("location"),
                optional: false,
                field:
                    <Form
                        fields={ModalInit.slice(9)}
                        data={formData}
                        options={areaSpecificData}
                        submitFunction={handleValues}
                        validiationFunction={validateSecondFormPart}
                        isPartOfStepper={true}
                        orientation={orientation}
                        setExternalValues={setValues}
                    />
            },
        ]

    return forms
}