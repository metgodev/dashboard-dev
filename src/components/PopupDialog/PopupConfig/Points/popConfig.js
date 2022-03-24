import term from "../../../../terms";
import { createRandomId } from "../../../../utils/randomId";

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [term('points'), term('gallery')]
export const ModalInit = [
    { title: term('general_information'), id: createRandomId(), field: 'generalInformation', type: 'divider', },
    // ------------------ general information ------------------
    { title: term('name'), id: createRandomId(), field: 'poiName', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: true },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: true },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker', maxItems: 3, required: true },
    { title: term('tags'), id: createRandomId(), field: 'tagsIds', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker', maxItems: 5, required: true },
    { title: term('contact_email'), id: createRandomId(), field: 'contactEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: false },
    // ------------------ general information ------------------
    { title: term('more_information'), id: createRandomId(), field: 'moreInformation', type: 'divider', },
    // ------------------ more information ------------------
    { title: term('description'), id: createRandomId(), field: 'description', rows: 5, maxRows: 5, size: 'small', type: 'textfield', required: true },
    { title: term('activities_in_place'), id: createRandomId(), field: 'activitiesInPlace', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: false },
    { title: term('exclusive_for'), id: createRandomId(), field: 'exclusiveFor', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: false },
    { title: term('preffered_season'), id: createRandomId(), field: 'prefferedSeason', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: false },
    { title: term('shady'), id: createRandomId(), field: 'shady', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: false },
    { title: term('arrival_recommendations'), id: createRandomId(), field: 'arrivalRecommendations', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: false },
    { title: term('phone_number'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: false },
    { title: term('webpage_url'), id: createRandomId(), field: 'websitesUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: false },
    { title: term('at_the_place'), id: createRandomId(), field: 'inPlace', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker', maxItems: 15, required: false },
    { title: term('short_description'), id: createRandomId(), field: 'shortDescription', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: true },
    { title: term('is_accessable'), id: createRandomId(), field: 'isAccessable', rows: 1, maxRows: 1, size: 'small', type: 'toggle', required: false },
    { title: term('tip'), id: createRandomId(), field: 'tip', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: false },
    // ------------------ more information ------------------
    { title: term('map_location'), id: createRandomId(), field: 'mapLocation', type: 'divider', },
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 1, size: 'small', type: 'googleAutocomplete', required: false },
    { title: term('location_name'), id: createRandomId(), field: 'locationName', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'small', type: 'MapPicker', required: false },
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

export const mediaUploadSections = [
    {
        title: term('upload_photo'),
        type: "image",
        fileTypes: ["JPG", "PNG", "GIF"],
    },
    {
        title: term('upload_video'),
        type: "video",
        fileTypes: ["MP4", "AVI", "WMV"],
    },
]