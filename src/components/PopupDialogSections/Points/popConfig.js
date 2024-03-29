import term from "../../../terms";
import { createRandomId } from "../../../utils/randomId";

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [term('points'), term('gallery')]
export const ModalInit = [
    // ------------------ general information ------------------
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: true },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 1, size: 'medium', type: 'picker', required: true },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 1, size: 'medium', type: 'tagsPicker', maxItems: 3, required: true },
    { title: term('tags'), id: createRandomId(), field: 'tags', rows: 1, maxRows: 1, size: 'medium', type: 'tagsPicker', maxItems: 5, required: true },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 5, maxRows: 5, size: 'medium', type: 'textAreaSizeable', required: true },
    { title: term('activities_in_place'), id: createRandomId(), field: 'activitiesInPlace', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('exclusive_for'), id: createRandomId(), field: 'exclusiveFor', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('short_description'), id: createRandomId(), field: 'shortDescription', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: true },
    { title: term('tip'), id: createRandomId(), field: 'tip', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('at_the_place'), id: createRandomId(), field: 'inPlace', rows: 1, maxRows: 1, size: 'medium', type: 'tagsPicker', maxItems: 15, required: false },
    { title: term('preffered_season'), id: createRandomId(), field: 'prefferedSeason', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: false },
    { title: term('arrival_recommendations'), id: createRandomId(), field: 'arrivalRecommendations', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: false },
    { title: term('shady'), id: createRandomId(), field: 'shady', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: false },
    { title: term('is_accessable'), id: createRandomId(), field: 'isAccessable', rows: 1, maxRows: 1, size: 'small', type: 'checkbox', required: false },
    // ------------------ general information ------------------
    //{ title: term('more_information'), id: createRandomId(), field: 'moreInformation', type: 'divider', },
    // ------------------ more information ------------------
    { title: term('contact_email'), id: createRandomId(), field: 'contactEmail', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('phone_number'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('webpage_url'), id: createRandomId(), field: 'websitesUrl', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    // ------------------ more information ------------------
    //{ title: term('map_location'), id: createRandomId(), field: 'mapLocation', type: 'divider', },
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 1, size: 'medium', type: 'googleAutocomplete', required: false, text: term('or_search_on_map') },
    { title: term('location_name'), id: createRandomId(), field: 'locationName', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: false },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'large', type: 'MapPicker', required: false },
    // ------------------ map ------------------
]

export const duplicateField = (field, maxFileds) => {
    const index = ModalInit.findIndex(({ field: f }) => f === field)
    if (index !== -1) {
        const numOfFields = ModalInit.filter(({ field: f }) => f === field).length
        if (numOfFields < maxFileds) {
            ModalInit.splice(index + 1, 0, { ...ModalInit[index], id: createRandomId(), title: `${ModalInit[index].title} ${numOfFields + 1}` })
        }
    }
}

export const mediaTabConfig = {
    mediaTypes: [
        {
            title: term('image'),
            type: "image",
            fileTypes: ["JPG", "PNG", "GIF"],
        },
        {
            title: term('video'),
            type: "video",
            fileTypes: ["MP4", "AVI", "WMV"],
        },
    ],
    initialMediaType: {
        title: term('image'),
        type: "image",
        fileTypes: ["JPG", "PNG", "JPEG"],
    }
}

export const fixPhoneNumber = (num) => {
    let newNum = ''
    for (const c of num) {
        if (!isNaN(c)) {
            newNum = newNum + c
        }
    }
    return parseInt(newNum)
}