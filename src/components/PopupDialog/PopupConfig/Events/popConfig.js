import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    let areaId = localStorage.getItem('areaID')
    client.service("authorities").find({ query: { areaId: areaId } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.autorityId = authorities))

    client.service("categories").find().then((res) => {
        res?.data.map(({ title, _id }) => picker.category = [...picker.category, { value: _id, name: term(title.toLowerCase()) }])
    })
})();

export const ModalTabs = [term('event'), term('gallery'),]
export const ModalInit = [
    { title: term('event_name'), id: 1, field: 'name', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('authority'), id: 2, field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('address'), id: 3, field: 'address', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('date_start'), id: 4, field: 'startDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('date_end'), id: 5, field: 'endDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('tags'), id: 16, field: 'tagsIds', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker' },
    { title: term('hours_open'), id: 6, field: 'openHour', rows: 4, maxRows: 1, size: 'small', type: 'timePicker' },
    { title: term('for_whom'), id: 7, field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('how_much'), id: 8, field: 'price', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('currency'), id: 9, field: 'currency', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer'), id: 10, field: 'producerName', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_phone'), id: 11, field: 'producerPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_mail'), id: 12, field: 'producerEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_phone'), id: 13, field: 'reservationCenterPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_mail'), id: 14, field: 'reservationCenterEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('site_link'), id: 15, field: 'websiteUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('categoryId'), id: 17, field: 'category', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('description'), id: 18, field: 'description', rows: 5, maxRows: 5, size: 'small', type: 'textfield' },
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
    relevantTo: [{ value: 'INFANCY', name: term('infency') },
    { value: 'KIDS&YOUTH', name: term('kids_&_youth') },
    { value: 'ALL_FAMILY', name: term('all_family') },
    { value: 'GROUPS', name: term('groups') },
    { value: 'GOLDEN_AGE', name: term('golden_age') },],
    autorityId: [],
    category: []
};

