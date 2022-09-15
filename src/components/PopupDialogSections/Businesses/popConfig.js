import term from "../../../terms";
import { createRandomId } from "../../../utils/randomId";

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [
    term('main'),
    term('gallery'),
    term('statistics'),
    term('comments'),
    term('calls'),
    term('reviews'),
    term('products'),
    term('sales'),
    term('invitation_manager'),
    term('premium')
];

export const ModalInit = [
    //------------------ General Information ------------------
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: true },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 4, size: 'medium', type: 'picker', required: true },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 4, size: 'medium', type: 'tagsPicker', maxItems: 3, required: true },
    { title: term('tags'), id: createRandomId(), field: 'tags', rows: 1, maxRows: 4, size: 'medium', type: 'tagsPicker', maxItems: 5, required: true, tooltip: term('business_tags_tooltip_text') },
    { title: term('opening_hours'), id: createRandomId(), field: 'openingHours', rows: 1, maxRows: 4, size: 'medium', type: 'timesPicker', required: false, relaredToggle: 'open24Hours' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'medium', type: 'textAreaSizeable', required: true, tooltip: term('business_description_tooltip_text') },
    { title: term('main_phone'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: true, tooltip: term('business_main_phone_text') },
    { title: term('short_description'), id: createRandomId(), field: 'shortDescription', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('by_appointment'), id: createRandomId(), field: 'reservations', rows: 1, maxRows: 4, size: 'small', type: 'picker', required: false },
    { title: term('mobile_phone'), id: createRandomId(), field: 'whatsAppPhoneNumber', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: true, tooltip: term('business_mobile_phone_text') },
    { title: term('open_on_weekend'), id: createRandomId(), field: 'openOnWeekend', rows: 1, maxRows: 4, size: 'small', type: 'checkbox', required: false },
    { title: term('open_24_hours'), id: createRandomId(), field: 'open24Hours', rows: 1, maxRows: 4, size: 'small', type: 'checkbox', required: false },
    { title: term('is_kosher'), id: createRandomId(), field: 'isKosher', rows: 1, maxRows: 4, size: 'small', type: 'checkbox', required: false, relaredToggle: 'open_on_weekend' },
    { title: term('is_accessable'), id: createRandomId(), field: 'isAccessable', rows: 1, maxRows: 4, size: 'small', type: 'checkbox', required: false },
    { title: term('approve_content'), id: createRandomId(), field: 'approveContent', rows: 1, maxRows: 4, size: 'small', type: 'checkbox', required: false },
    //------------------ More Information ------------------ 
    { title: term('site_link'), id: createRandomId(), field: 'websitesUrl', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: true },
    { title: term('contact'), id: createRandomId(), field: 'contactPersonName', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: true, tooltip: term('business_contact_person_text') },
    { title: term('email_address'), id: createRandomId(), field: 'emailAddress', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: false },
    { title: term('contact_number'), id: createRandomId(), field: 'contactPersonPhoneNumber', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: true, tooltip: term('business_contact_person_text') },
    { title: term('facebook_link'), id: createRandomId(), field: 'facebookPageUrl', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: false, tooltip: term('business_facebook_text') },
    { id: createRandomId(), type: 'placeholder', size: 'medium' },
    { title: term('instagram_link'), id: createRandomId(), field: 'instagramPageUrl', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: false, tooltip: term('business_instagram_text') },
    { id: createRandomId(), type: 'placeholder', size: 'medium' },
    { title: term('youtube_link'), id: createRandomId(), field: 'youtubePageUrl', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: false },
    { id: createRandomId(), type: 'placeholder', size: 'medium' },
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 4, size: 'medium', type: 'googleAutocomplete', required: true },
    { title: term('location_description'), id: createRandomId(), field: 'locationName', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: false },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'large', type: 'MapPicker', required: false },
]

export const productFields = [
    [
        { title: term('name'), id: createRandomId(), field: 'name', size: 'medium', type: 'textfield' },
        { title: term('price'), id: createRandomId(), field: 'price', size: 'medium', type: 'number' },
        { title: term('description'), id: createRandomId(), field: 'description', size: 'medium', type: 'textAreaSizeable' },
        { title: term('tags'), id: createRandomId(), field: 'tags', size: 'medium', type: 'tagsPicker' },
    ],
    [
        { title: term('product_includes'), id: createRandomId(), field: 'productIncludes', size: 'medium', type: 'textfield' },
        { title: term('style'), id: createRandomId(), field: 'style', size: 'medium', type: 'textfield' },
        //{ title: term('days_and_hours'), id: createRandomId(), field: 'hours', size: 'medium', type: 'textfield' },
        { title: term('shipping'), id: createRandomId(), field: 'shipmentType', size: 'medium', type: 'picker' },
        { title: term('sizeAndDimension'), id: createRandomId(), field: 'sizeAndDimension', size: 'medium', type: 'textfield' },
        { title: term('product_materials'), id: createRandomId(), field: 'productComponents', size: 'medium', type: 'textfield' },
        { title: term('relevantTo'), id: createRandomId(), field: 'relevantTo', size: 'medium', type: 'tagsPicker' },
        { title: term('usage_restrictions'), id: createRandomId(), field: 'useageRestrictions', size: 'medium', type: 'textfield' },
        { title: term('in_stock'), id: createRandomId(), field: 'inStock', size: 'medium', type: 'checkbox' },
    ],
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

export const fixPhoneNumber = (num) => {
    let newNum = ''
    for (const c of num) {
        if (!isNaN(c)) {
            newNum = newNum + c
        }
    }
    return parseInt(newNum)
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

export const mediaTabConfig = {
    mediaTypes: [
        {
            title: term('logo'),
            type: "logo",
            fileTypes: ["JPG", "PNG", "JPEG"],
        },
        {
            title: term('images'),
            type: "image",
            fileTypes: ["JPG", "PNG", "JPEG"],
        },
        {
            title: term('videos'),
            type: "video",
            fileTypes: ["MP4", "AVI", "WMV"],
        },
        {
            title: term('audio_files'),
            type: "files",
            fileTypes: ["MP3"],
        },
    ],
    initialMediaType: {
        title: term('logo'),
        type: "logo",
        fileTypes: ["JPG", "PNG", "JPEG"],
    }
}


