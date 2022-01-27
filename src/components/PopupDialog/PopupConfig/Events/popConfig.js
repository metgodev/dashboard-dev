import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    let areaId = localStorage.getItem('aid')
    client.service("authorities").find({ query: { areaId: areaId } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.authorityId = authorities))

    client.service("categories").find().then((res) => {
        res?.data.map(({ title, _id }) => picker.categoryId = [...picker.categoryId, { value: _id, name: term(title.toLowerCase()) }])
    })

    client.service("tags").find().then((res) => {
        res?.data.map(({ title, _id }) => tags = [...tags, { title, id: _id }])
    })
})();

export const ModalTabs = [term('event'), term('gallery'),]
export const ModalInit = [
    { title: term('event_name'), id: 1, field: 'name', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('authority'), id: 2, field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('address'), id: 3, field: 'address', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('date_start'), id: 4, field: 'startDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('date_end'), id: 5, field: 'endDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('tags'), id: 6, field: 'tagsIds', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker' },
    { title: term('opening_hours'), id: 7, field: 'openHour', rows: 4, maxRows: 1, size: 'small', type: 'timePicker' },
    { title: term('for_whom'), id: 8, field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('how_much'), id: 9, field: 'price', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('currency'), id: 10, field: 'currency', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer'), id: 11, field: 'producerName', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_phone'), id: 12, field: 'producerPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_mail'), id: 13, field: 'producerEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_phone'), id: 14, field: 'reservationCenterPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_mail'), id: 15, field: 'reservationCenterEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('site_link'), id: 16, field: 'websiteUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('category_id'), id: 17, field: 'categoryId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('description'), id: 18, field: 'description', rows: 5, maxRows: 5, size: 'small', type: 'textfield' },
]

export let tags = []

export let picker = {
    relevantTo: [{ value: 'INFANCY', name: term('infancy') },
    { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
    { value: 'ALL_FAMILY', name: term('all_family') },
    { value: 'GROUPS', name: term('groups') },
    { value: 'GOLDEN_AGE', name: term('golden_age') },],
    authorityId: [],
    categoryId: []
};

