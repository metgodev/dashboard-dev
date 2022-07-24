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

const initialDataFormOne = {
    name: "",
    authority: "",
    tags: [],
    description: "",
    shortDescription: "",
    free: false,
    openHour: date.toISOString(),
    isAccessable: false,
    endDate: date.toISOString(),
    startDate: date.toISOString(),
    price: 0,
    relatedBusinessId: [],
    relevantTo: [],
    online: false,
    onlineMeetingURL: "",
    reservations: []
}
const initialDataFormTwo = {
    reservationCenterPhone: "",
    reservationCenterEmail: "",
    websitesUrl: [""],
    registrationLink: ""
}

const initialDataFormThree = {
    locationName: "",
    point: [0, 0]
}

export const GetValuesToSendFirstPart = (values, allTags) => {

    let firstFormValues = {
        name: values.length || Object.keys(values).length ? values.hasOwnProperty('name') ? values.name : initialDataFormOne.name : initialDataFormOne.name,
        authorityId: values.length || Object.keys(values).length ? values.hasOwnProperty('authority') ? values.authority._id : initialDataFormOne.authority : initialDataFormOne.authority,
        tagsIds: values.length || Object.keys(values).length ? values.hasOwnProperty('tags') ? getTagsForForm(values.tags, allTags) : initialDataFormOne.tags : initialDataFormOne.tags,
        description: values.length || Object.keys(values).length ? values.hasOwnProperty('description') ? values.description : initialDataFormOne.description : initialDataFormOne.description,
        shortDescription: values.length || Object.keys(values).length ? values.hasOwnProperty('shortDescription') ? values.shortDescription : initialDataFormOne.shortDescription : initialDataFormOne.shortDescription,
        free: values.length || Object.keys(values).length ? values.hasOwnProperty('free') ? values.free : initialDataFormOne.free : initialDataFormOne.free,
        openHour: values.length || Object.keys(values).length ? values.hasOwnProperty('openHour') ? values.openHour : initialDataFormOne.openHour : initialDataFormOne.openHour,
        isAccessable: values.length || Object.keys(values).length ? values.hasOwnProperty('isAccessable') ? values.isAccessable : initialDataFormOne.isAccessable : initialDataFormOne.isAccessable,
        endDate: values.length || Object.keys(values).length ? values.hasOwnProperty('endDate') ? values.endDate : initialDataFormOne.endDate : initialDataFormOne.endDate,
        startDate: values.length || Object.keys(values).length ? values.hasOwnProperty('startDate') ? values.startDate : initialDataFormOne.startDate : initialDataFormOne.startDate,
        price: values.length || Object.keys(values).length ? values.hasOwnProperty('price') ? values.price : initialDataFormOne.price : initialDataFormOne.price,
        relevantTo: values.length || Object.keys(values).length ? values.hasOwnProperty('relevantTo') ? values.relevantTo : initialDataFormOne.relevantTo : initialDataFormOne.relevantTo,
        online: values.length || Object.keys(values).length ? values.hasOwnProperty('online') ? values.online : initialDataFormOne.online : initialDataFormOne.online,
        reservations: values.length || Object.keys(values).length ? values.hasOwnProperty('reservations') ? values.reservations : initialDataFormOne.reservations : initialDataFormOne.reservations,
        onlineMeetingURL: values.length || Object.keys(values).length ? values.hasOwnProperty('onlineMeetingURL') ? values.onlineMeetingURL : initialDataFormOne.onlineMeetingURL : initialDataFormOne.onlineMeetingURL,
    }

    const [returnValues, setReturnValues] = useState(firstFormValues)

    useEffect(() => {
        setReturnValues(firstFormValues)
    }, [values])

    return returnValues
}
export const GetValuesToSendSecondPart = (values) => {

    let secondFormValues = {
        reservationCenterPhone: values.length || Object.keys(values).length ? values.hasOwnProperty('reservationCenterPhone') ? values.reservationCenterPhone : initialDataFormTwo.reservationCenterPhone : initialDataFormTwo.reservationCenterPhone,
        reservationCenterEmail: values.length || Object.keys(values).length ? values.hasOwnProperty('reservationCenterEmail') ? values.reservationCenterEmail : initialDataFormTwo.reservationCenterEmail : initialDataFormTwo.reservationCenterEmail,
        websitesUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('websitesUrl') && values.websitesUrl !== undefined && values.websitesUrl[0] !== undefined ? values.websitesUrl[0] : initialDataFormTwo.websitesUrl : initialDataFormTwo.websitesUrl,
        registrationLink: values.length || Object.keys(values).length ? values.hasOwnProperty('registrationLink') ? values.registrationLink : initialDataFormTwo.registrationLink : initialDataFormTwo.registrationLink
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
        point: values.length || Object.keys(values).length ? values.hasOwnProperty('locationInfo') && Object.keys(values.locationInfo) > 0 ? values.locationInfo.coordinates : initialDataFormThree.point : initialDataFormThree.point
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
}


export const GetFormFields = (ModalInit, formData, areaSpecificData, handleValues, validateFirstFormPart, validateThirdFormPart, validateSeconsFormPart, orientation, setValues) => {

    const [forms, setForms] = useState([])

    useEffect(() => {
        if (formData && areaSpecificData) {
            setForms(formToSend)
        }
    }, [formData, areaSpecificData, orientation])

    let formToSend = [
        {
            title: term("event_details"),
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