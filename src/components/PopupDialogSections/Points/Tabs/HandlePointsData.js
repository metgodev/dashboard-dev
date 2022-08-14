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
    prefferedSeason: [
        { value: "SUMMER", name: term('summer') },
        { value: "WINTER", name: term('winter') },
        { value: "FALL", name: term('fall') },
        { value: "SPRING", name: term('spring') },
        { value: 'ALL_SEASONS', name: term('all_seasons') }
    ],
    arrivalRecommendations: [
        { value: "WALK", name: term('walk') },
        { value: "OFF_ROAD", name: term('off_road') },
        { value: "CAR", name: term('car') },
        { value: "BICYCLE", name: term('bicycle') },
    ],
    inPlace: [
        { id: "PICNIC_TABLES", title: term('picnic_tables') },
        { id: "BENCHES", title: term('benches') },
        { id: "TINS", title: term('tins') },
        { id: "BBQ_POSITIONS", title: term('bbq_positions') },
        { id: "TOILET", title: term('toilet') },
        { id: "DRINKING_FOUNTAIN", title: term('drinking_fountain') },
        { id: "PLAY_FACILITIES", title: term('play_facilities') },
        { id: "EXERCISE_MACHINES", title: term('exercise_machines') },
        { id: "DOG_GARDEN", title: term('dog_garden') },
        { id: "EXPLANATORY_BOARD", title: term('explanatory_board') },
        { id: "BUFFET", title: term('buffet') },
        { id: "CLOAKROOM", title: term('cloakroom') },
        { id: "BEACH_SHOWER", title: term('beach_shower') },
        { id: "FREE_PARKING", title: term('free_parking') },
        { id: "NEAT_PARKING", title: term('neat_parking') },
    ],
    shady: [
        { value: "FULL", name: term('full') },
        { value: "PARTIAL", name: term('partial') },
        { value: "NONE", name: term('none') }
    ],
    authorityId: [],
    categoriesIds: [],
    tagsIds: [],
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
                        fields={ModalInit.slice(14, 17)}
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
                        fields={ModalInit.slice(17)}
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