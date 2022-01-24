import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    let areaId = localStorage.getItem('areaID')
    client.service("authorities").find({ query: { areaId: areaId } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.autorityId = authorities))
})();

export const ModalTabs = [term('event')]
export const ModalInit = [
    { title: term('event_name'), id: 1, field: 'name', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('address'), id: 2, field: 'address', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('date_start'), id: 3, field: 'start', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('date_end'), id: 4, field: 'end', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('tags'), id: 5, field: 'tagsIds', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker' },
    { title: term('category'), id: 6, field: 'category', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('hours_open'), id: 7, field: 'hours open', rows: 4, maxRows: 1, size: 'small', type: 'timePicker' },
    { title: term('for_whom'), id: 8, field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('how_much'), id: 9, field: 'howMuch', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer'), id: 10, field: 'producer', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_phone'), id: 11, field: 'producerPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_mail'), id: 12, field: 'producerMail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_phone'), id: 13, field: 'reservationsPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_mail'), id: 14, field: 'reservationsMail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('site_link'), id: 15, field: 'websiteUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('description'), id: 16, field: 'description', rows: 1, maxRows: 4, size: 'small', type: 'textArea' },
    { title: term('authority'), id: 17, field: 'autorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('area'), id: 18, field: 'area', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
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
    autorityId: [],
    category: [{ value: 'something', name: 'something' }]
};

