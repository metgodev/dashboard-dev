import term from "../../../terms";
import { createRandomId } from "../../../utils/randomId";

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [term('event'), term('gallery'),]
export const ModalInit = [
    // ------------------ general information ------------------
    { title: term('event_name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: true },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 1, size: 'medium', type: 'picker', required: true },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 1, size: 'medium', type: 'tagsPicker', maxItems: 3, required: true },
    { title: term('tags'), id: createRandomId(), field: 'tags', rows: 1, maxRows: 1, size: 'medium', type: 'tagsPicker', maxItems: 5, required: true },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 5, maxRows: 5, size: 'medium', type: 'textAreaSizeable', required: true },
    { title: term('short_description'), id: createRandomId(), field: 'shortDescription', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: true },
    { title: term('reservations'), id: createRandomId(), field: 'reservations', rows: 1, maxRows: 1, size: 'medium', type: 'picker', required: false },
    { title: term('how_much'), id: createRandomId(), field: 'price', rows: 1, maxRows: 1, size: 'small', type: 'textfield', required: false, relaredToggle: 'free' },
    { title: term('free'), id: createRandomId(), field: 'free', rows: 1, maxRows: 1, size: 'small', type: 'checkbox', required: false },
    { title: term('online_meeting_link'), id: createRandomId(), field: 'onlineMeetingURL', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('online'), id: createRandomId(), field: 'online', rows: 1, maxRows: 1, size: 'medium', type: 'checkbox', required: false },
    { title: term('date_start'), id: createRandomId(), field: 'startDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker', required: true },
    { title: term('date_end'), id: createRandomId(), field: 'endDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker', required: false },
    { title: term('opening_hours'), id: createRandomId(), field: 'openHour', rows: 4, maxRows: 1, size: 'small', type: 'timePicker', required: true },
    { title: term('is_accessable'), id: createRandomId(), field: 'isAccessable', rows: 1, maxRows: 4, size: 'small', type: 'checkbox', required: false },
    // ------------------ general information ------------------
    // { title: term('more_information'), id: createRandomId(), field: 'moreInformation', type: 'divider', },
    // ------------------ more information ------------------
    // { title: term('currency'), id: createRandomId(), field: 'currency', rows: 1, maxRows: 1, size: 'small', type: 'picker', required: true },
    { title: term('reservations_phone'), id: createRandomId(), field: 'reservationCenterPhone', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('reservations_mail'), id: createRandomId(), field: 'reservationCenterEmail', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: false },
    { title: term('site_link'), id: createRandomId(), field: 'websitesUrl', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: true },
    { title: term('registration_link'), id: createRandomId(), field: 'registrationLink', rows: 1, maxRows: 1, size: 'medium', type: 'textfield', required: true },
    // ------------------ more information ------------------
    // { title: term('map_location'), id: createRandomId(), field: 'mapLocation', type: 'divider', },
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 4, size: 'medium', type: 'googleAutocomplete', required: true, text: term('or_search_on_map') },
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