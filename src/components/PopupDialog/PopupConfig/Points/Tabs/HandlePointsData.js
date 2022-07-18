import { useEffect, useState } from "react";
import term from "../../../../../terms";

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

const initialDataFormOne = {
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
    relevantTo: []
}
const initialDataFormTwo = {
    contactEmail: "",
    phoneNumber: "",
    websitesUrl: [],
}
const initialDataFormThree = {
    locationName: "",
    point: [0, 0]
}

export const GetValuesToSendFirstPart = (values, allTags) => {

    let firstFormValues = {}

    firstFormValues = {
        name: values.length || Object.keys(values).length ? values.hasOwnProperty('name') ? values.name : initialDataFormOne.name : initialDataFormOne.name,
        authorityId: values.length || Object.keys(values).length ? values.hasOwnProperty('authority') ? values.authority._id : initialDataFormOne.authority : initialDataFormOne.authority,
        activitiesInPlace: values.length || Object.keys(values).length ? values.hasOwnProperty('activitiesInPlace') ? values.activitiesInPlace : initialDataFormOne.activitiesInPlace : initialDataFormOne.activitiesInPlace,
        description: values.length || Object.keys(values).length ? values.hasOwnProperty('description') ? values.description : initialDataFormOne.description : initialDataFormOne.description,
        exclusiveFor: values.length || Object.keys(values).length ? values.hasOwnProperty('exclusiveFor') ? values.exclusiveFor : initialDataFormOne.exclusiveFor : initialDataFormOne.exclusiveFor,
        isAccessable: values.length || Object.keys(values).length ? values.hasOwnProperty('isAccessable') ? values.isAccessable : initialDataFormOne.isAccessable : initialDataFormOne.isAccessable,
        shortDescription: values.length || Object.keys(values).length ? values.hasOwnProperty('shortDescription') ? values.shortDescription : initialDataFormOne.shortDescription : initialDataFormOne.shortDescription,
        tagsIds: values.length || Object.keys(values).length ? values.hasOwnProperty('tags') ? getTagsForForm(values.tags, allTags) : initialDataFormOne.tags : initialDataFormOne.tags,
        shady: values.length || Object.keys(values).length ? values.hasOwnProperty('shady') ? values.shady : initialDataFormOne.shady : initialDataFormOne.shady,
        arrivalRecommendations: values.length || Object.keys(values).length ? values.hasOwnProperty('arrivalRecommendations') ? values.arrivalRecommendations : initialDataFormOne.arrivalRecommendations : initialDataFormOne.arrivalRecommendations,
        tip: values.length || Object.keys(values).length ? values.hasOwnProperty('tip') ? values.tip : initialDataFormOne.tip : initialDataFormOne.tip,
        inPlace: values.length || Object.keys(values).length ? values.hasOwnProperty('inPlace') ? values.inPlace : initialDataFormOne.inPlace : initialDataFormOne.inPlace,
        relevantTo: values.length || Object.keys(values).length ? values.hasOwnProperty('relevantTo') ? values.relevantTo : initialDataFormOne.relevantTo : initialDataFormOne.relevantTo,
        prefferedSeason: values.length || Object.keys(values).length ? values.hasOwnProperty('prefferedSeason') ? values.prefferedSeason : initialDataFormOne.prefferedSeason : initialDataFormOne.prefferedSeason,
    }

    const [returnValues, setReturnValues] = useState(firstFormValues)

    useEffect(() => {
        setReturnValues(firstFormValues)
    }, [values])

    return returnValues
}


export const GetValuesToSendSecondPart = (values) => {

    let secondFormValues = {
        contactEmail: values.length || Object.keys(values).length ? values.hasOwnProperty('contactEmail') ? values.contactEmail : initialDataFormTwo.contactEmail : initialDataFormTwo.contactEmail,
        phoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('phoneNumber') ? values.phoneNumber : initialDataFormTwo.phoneNumber : initialDataFormTwo.phoneNumber,
        websitesUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('websitesUrl') ? values.websitesUrl : initialDataFormTwo.websitesUrl : initialDataFormTwo.websitesUrl,
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