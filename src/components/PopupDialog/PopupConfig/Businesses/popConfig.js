import { client } from "../../../../API/metro";
import term from "../../../../terms";
import { createRandomId } from "../../../../utils/randomId";


(async () => {
    let area_id = localStorage.getItem('aid')
    await client.service("authorities").find({ query: { areaId: area_id } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.authorityId = authorities))

    await client.service('area').find({ query: { _id: area_id } })
        .then(({ data }) => data[0].tags.map(({ title, _id }) => tags = [...tags, { title, id: _id }]));
})();

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [term('details'), term('statistics'), term('gallery'), term('promotion'), term('calls')]
export const ModalInit = [
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 4, size: 'small', type: 'googleAutocomplete', required: true },
    { title: term('location_name'), id: createRandomId(), field: 'locationName', rows: 1, maxRows: 4, size: 'small', type: 'locationName', required: false },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'small', type: 'MapPicker', required: false },
    // ------------------ map ------------------
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'small', type: 'textfield', required: true },
    { title: term('tags'), id: createRandomId(), field: 'tagsIds', rows: 1, maxRows: 4, size: 'small', type: 'tagsPicker', required: true },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 4, size: 'small', type: 'picker', required: true },
    { title: term('phone_number'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('contact'), id: createRandomId(), field: 'contactPersonName', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('business_number'), id: createRandomId(), field: 'contactPersonPhoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('email_address'), id: createRandomId(), field: 'emailAddress', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 4, size: 'small', type: 'picker', required: false },
    { title: term('opening_hours'), id: createRandomId(), field: 'openingHours', rows: 1, maxRows: 4, size: 'small', type: 'timesPicker', required: false },
    { title: term('site_link'), id: createRandomId(), field: 'websiteUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('facebook_link'), id: createRandomId(), field: 'facebookPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('instagram_link'), id: createRandomId(), field: 'instagramPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('youtube_link'), id: createRandomId(), field: 'youtubePageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('twitter_link'), id: createRandomId(), field: 'twitterPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('linkedIn_link'), id: createRandomId(), field: 'linkedInPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield', required: false },
    { title: term('open_24_hours'), id: createRandomId(), field: 'open24Hours', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false },
    { title: term('open_on_weekend'), id: createRandomId(), field: 'openOnWeekend', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false },
    { title: term('is_kosher'), id: createRandomId(), field: 'isKosher', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false },
    { title: term('is_accessable'), id: createRandomId(), field: 'isAccessable', rows: 1, maxRows: 4, size: 'small', type: 'toggle', required: false },
]

export let tags = []

export let picker = {
    relevantTo: [{ value: 'INFANCY', name: term('infancy') },
    { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
    { value: 'ALL_FAMILY', name: term('all_family') },
    { value: 'GROUPS', name: term('groups') },
    { value: 'GOLDEN_AGE', name: term('golden_age') }],
    authorityId: []
};

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


