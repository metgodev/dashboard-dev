import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    let areaId = localStorage.getItem('aid')
    client.service("authorities").find({ query: { areaId: areaId } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.autorityId = authorities))


    client.service("tags").find().then((res) => {
        res?.data.map(({ title, _id }) => tags = [...tags, { title, id: _id }])
    })
})();


export const ModalTabs = [term('details'), term('statistics'), term('gallery'), term('promotion'), term('calls')]
export const ModalInit = [
    { title: term('name'), id: 1, field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('description'), id: 2, field: 'description', rows: 4, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('tags'), id: 3, field: 'tagsIds', rows: 1, maxRows: 4, size: 'small', type: 'tagsPicker' },
    { title: term('authority'), id: 4, field: 'autorityId', rows: 1, maxRows: 4, size: 'small', type: 'picker' },
    { title: term('address'), id: 5, field: 'address', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('phone_number') + " " + term('Will_not_be_displayed'), id: 6, field: 'phoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('contact'), id: 7, field: 'contactPersonName', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('business_number'), id: 8, field: 'contactPersonPhoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('email_address'), id: 9, field: 'emailAddress', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('for_whom'), id: 10, field: 'relevantTo', rows: 1, maxRows: 4, size: 'small', type: 'picker' },
    { title: term('opening_hours'), id: 11, field: 'openingHours', rows: 1, maxRows: 4, size: 'small', type: 'timePicker' },
    { title: term('site_link'), id: 12, field: 'websiteUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('facebook_link'), id: 13, field: 'facebookPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('instagram_link'), id: 14, field: 'instagramPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('youtube_link'), id: 15, field: 'youtubePageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('twitter_link'), id: 16, field: 'twitterPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('linkedIn_link'), id: 17, field: 'linkedInPageUrl', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('open_24_hours'), id: 18, field: 'open24Hours', rows: 1, maxRows: 4, size: 'small', type: 'toggle' },
    { title: term('open_on_weekend'), id: 19, field: 'openOnWeekend', rows: 1, maxRows: 4, size: 'small', type: 'toggle' },
    { title: term('is_kosher'), id: 20, field: 'isKosher', rows: 1, maxRows: 4, size: 'small', type: 'toggle' },
]

export let tags = []

export let picker = {
    relevantTo: [{ value: 'INFANCY', name: term('infancy') },
    { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
    { value: 'ALL_FAMILY', name: term('all_family') },
    { value: 'GROUPS', name: term('groups') },
    { value: 'GOLDEN_AGE', name: term('golden_age') },],
    autorityId: []
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