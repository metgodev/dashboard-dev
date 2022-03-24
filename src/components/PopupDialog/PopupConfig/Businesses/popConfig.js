import term from "../../../../terms";
import { createRandomId } from "../../../../utils/randomId";

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [term('details'), term('statistics'), term('gallery'), term('promotion'), term('calls')]
export const ModalInit = [
    { title: term('general_information'), id: createRandomId(), field: 'generalInformation', type: 'divider', },
    //------------------ General Information ------------------
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 4, size: 'small', type: 'picker', required: true },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 4, size: 'small', type: 'tagsPicker', maxItems: 3, required: true },
    { title: term('tags'), id: createRandomId(), field: 'tagsIds', rows: 1, maxRows: 4, size: 'small', type: 'tagsPicker', maxItems: 5, required: true },
    { title: term('opening_hours'), id: createRandomId(), field: 'openingHours', rows: 1, maxRows: 4, size: 'small', type: 'timesPicker', required: false, relaredToggle: 'open24Hours' },
    { title: term('open_24_hours'), id: createRandomId(), field: 'open24Hours', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false },
    //------------------ General Information ------------------
    { title: term('more_information'), id: createRandomId(), field: 'moreInformation', type: 'divider', },
    //------------------ More Information ------------------ 
    { title: term('site_link'), id: createRandomId(), field: 'websitesUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('phone_number'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('contact'), id: createRandomId(), field: 'contactPersonName', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('business_number'), id: createRandomId(), field: 'contactPersonPhoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('email_address'), id: createRandomId(), field: 'emailAddress', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('facebook_link'), id: createRandomId(), field: 'facebookPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('instagram_link'), id: createRandomId(), field: 'instagramPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('youtube_link'), id: createRandomId(), field: 'youtubePageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('short_description'), id: createRandomId(), field: 'shortDescription', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('reservations'), id: createRandomId(), field: 'reservations', rows: 1, maxRows: 4, size: 'small', type: 'picker', required: false },
    { title: term('open_on_weekend'), id: createRandomId(), field: 'openOnWeekend', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false },
    { title: term('is_kosher'), id: createRandomId(), field: 'isKosher', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false, relaredToggle: 'open_on_weekend' },
    { title: term('is_accessable'), id: createRandomId(), field: 'isAccessable', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false },
    //------------------ More Information ------------------
    { title: term('map_location'), id: createRandomId(), field: 'mapLocation', type: 'divider', },
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 4, size: 'small', type: 'googleAutocomplete', required: true },
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


export let TimePicker = [
    { day: term('sunday_opening'), type: 1, timeref: 'sunday' },
    { day: term('sunday_closing'), type: 2, timeref: 'sunday' },
    { day: term('monday_opening'), type: 1, timeref: 'monday' },
    { day: term('monday_closing'), type: 2, timeref: 'monday' },
    { day: term('tuesday_opening'), type: 1, timeref: 'tuesday' },
    { day: term('tuesday_closing'), type: 2, timeref: 'tuesday' },
    { day: term('wednesday_opening'), type: 1, timeref: 'wednesday' },
    { day: term('wednesday_closing'), type: 2, timeref: 'wednesday' },
    { day: term('thursday_opening'), type: 1, timeref: 'thursday' },
    { day: term('thursday_closing'), type: 2, timeref: 'thursday' },
    { day: term('friday_opening'), type: 1, timeref: 'friday' },
    { day: term('friday_closing'), type: 2, timeref: 'friday' },
    { day: term('saturday_opening'), type: 1, timeref: 'saturday' },
    { day: term('saturday_closing'), type: 2, timeref: 'saturday' },
];

export const statisticsText = `מספר לחיצות על: טלפון, אתר, ניווט, שיתוף, מייל, שמירה, תמונות, דירוג
מספר צפיות בדף העסק, מסלולים, אירועים
ציון בדירוג
פידבק משתמשים
משתמשים צפו בדף
משתמשים חוזרים
אירועים שהעסק פתח
מספר מסלולים שהעסק מופיע
כמה כסף נכנס מתו נגב - כמה תוים נרכשו`

export const mediaUploadSections = [
    {
        title: term('logo'),
        type: "logo",
        fileTypes: ["JPG", "PNG", "PDF"],
    },
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
    {
        title: term('audio'),
        type: "files",
        fileTypes: ["MP3"],
    },
]


