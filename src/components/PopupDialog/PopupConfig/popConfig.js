import term from "../../../terms";


export const ModalTabs = [term('details'), term('statistics'), term('gallery'), term('promotion'), term('calls')]
export const ModalInit = [
    { title: term('businesse_name'), id: 1, field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('description'), id: 2, field: 'description', rows: 4, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('tags'), id: 3, field: 'tagsIds', rows: 1, maxRows: 4, size: 'small', type: 'tagsPicker' },
    { title: term('authority'), id: 4, field: 'autorityId', rows: 1, maxRows: 4, size: 'small', type: 'picker' },
    { title: term('address'), id: 5, field: 'address', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('contact'), id: 6, field: 'phoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('contact_name'), id: 7, field: 'contactPersonName', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
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
]

export const tags = [
    { id: 'נגב - כנסים וקבוצות' },
    { id: 'נגב - פעילות חקלאית' },
    { id: 'נגב - תוצרת מקומית' },
    { id: 'נגב - אומנות ועיצוב' },
    { id: 'נגב - סדנאות והרצאות' },
    { id: "נגב - אירוח ביתי וארוחות שף" },
    { id: 'הרצליה - דירות נופש' },
]

export const picker = {
    relevantTo: [{ value: 'INFANCY', name: 'לגיל הרך' },
    { value: 'KIDS&YOUTH', name: 'לילדים ונוער' },
    { value: 'ALL_FAMILY', name: 'לכל המשפחה' },
    { value: 'GROUPS', name: 'לזוגות' },
    { value: 'GOLDEN_AGE', name: 'לקבוצות' },],
    autorityId: [{ value: 'מועצה איזורית שער הנגב' },
    { value: 'רהט' },
    { value: 'הרצליה' },
    { value: 'אופקים' },
    { value: 'נתיבות' },]
};

export const TimePicker = [
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