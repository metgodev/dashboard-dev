import term from "../../../terms";


export const ModalTabs = [term('details'), term('statistics'), term('gallery'), term('promotion'), term('calls')]
export const ModalInit = [
    { title: term('businesse_name'), id: 1, field: 'bussinesName', rows: 1, maxRows: 4, size: 'small' },
    { title: term('for_whom'), id: 2, field: 'suitableFor', rows: 1, maxRows: 4, size: 'small' },
    { title: term('authority'), id: 3, field: 'authority', rows: 1, maxRows: 4, size: 'small' },
    { title: term('address'), id: 4, field: 'address', rows: 1, maxRows: 4, size: 'small' },
    { title: term('tags'), id: 5, field: 'tags', rows: 4, maxRows: 4, size: 'small' },
    { title: term('description'), id: 6, field: 'description', rows: 1, maxRows: 4, size: 'small' },
    { title: term('opening_hours'), id: 7, field: 'openingTimes', rows: 1, maxRows: 4, size: 'small' },
    { title: term('contact'), id: 8, field: 'contactNumber', rows: 1, maxRows: 4, size: 'small' },
    { title: term('contact_number'), id: 9, field: 'phoneNumber', rows: 1, maxRows: 4, size: 'small' },
    { title: term('site_link'), id: 10, field: 'websiteLink', rows: 1, maxRows: 4, size: 'small' },
    { title: term('business_number'), id: 11, field: 'bussinesPhone', rows: 1, maxRows: 4, size: 'small' },
    { title: term('email_address'), id: 12, field: 'email', rows: 1, maxRows: 4, size: 'small' },
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
    suitableFor: [{ value: 'לגיל הרך' },
    { value: 'לילדים ונוער' },
    { value: 'לכל המשפחה' },
    { value: 'לזוגות' },
    { value: 'לקבוצות' },],
    authority: [{ value: 'מועצה איזורית שער הנגב' },
    { value: 'רהט' },
    { value: 'הרצליה' },
    { value: 'אופקים' },
    { value: 'נתיבות' },]
};

export const TimePicker = [
    {day:term('sunday_opening') , type: 1},
    {day:term('sunday_closing'), type: 2},
    {day:term('monday_opening'), type: 1},
    {day:term('monday_closing'), type: 2},
    {day:term('tuesday_opening'), type: 1},
    {day:term('tuesday_closing'), type: 2},
    {day:term('wednesday_opening'), type: 1},
    {day:term('wednesday_closing'), type: 2},
    {day:term('thursday_opening'), type: 1},
    {day:term('thursday_closing'), type: 2},
    {day:term('friday_opening'), type: 1},
    {day:term('friday_closing'), type: 2},
    {day:term('saturday_opening'), type: 1},
    {day:term('saturday_closing'), type: 2},
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