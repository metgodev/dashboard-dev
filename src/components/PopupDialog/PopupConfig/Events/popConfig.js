import { client } from "../../../../API/metro";
import term from "../../../../terms";
import { createRandomId } from "../../../../utils/randomId";


(async () => {
    let area_id = localStorage.getItem('aid')
    await client.service("authorities").find({ query: { areaId: area_id } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.authorityId = authorities))

    await client.service("categories").find().then((res) => {
        res?.data.map(({ title, _id }) => picker.categoryId = [...picker.categoryId, { value: _id, name: term(title.toLowerCase()) }])
    })

    await client.service('area').find({ query: { _id: area_id } })
        .then(({ data }) => data[0].tags.map(({ title, _id }) => tags = [...tags, { title, id: _id }]));
})();

export const ModalTabs = [term('event'), term('gallery'),]
export const ModalInit = [
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 1, size: 'small', type: 'googleAutocomplete' },
    { title: term('location_name'), id: createRandomId(), field: 'locationName', rows: 1, maxRows: 4, size: 'small', type: 'locationName' },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'small', type: 'MapPicker' },
    // ------------------ map ------------------
    { title: term('event_name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('date_start'), id: createRandomId(), field: 'startDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('date_end'), id: createRandomId(), field: 'endDate', rows: 1, maxRows: 1, size: 'small', type: 'datePicker' },
    { title: term('tags'), id: createRandomId(), field: 'tags', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker' },
    { title: term('opening_hours'), id: createRandomId(), field: 'openHour', rows: 4, maxRows: 1, size: 'small', type: 'timePicker' },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('how_much'), id: createRandomId(), field: 'price', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('currency'), id: createRandomId(), field: 'currency', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('producer'), id: createRandomId(), field: 'producerName', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_phone'), id: createRandomId(), field: 'producerPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('producer_mail'), id: createRandomId(), field: 'producerEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_phone'), id: createRandomId(), field: 'reservationCenterPhone', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('reservations_mail'), id: createRandomId(), field: 'reservationCenterEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('site_link'), id: createRandomId(), field: 'websiteUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('category_id'), id: createRandomId(), field: 'categoryId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 5, maxRows: 5, size: 'small', type: 'textfield' },
]

export let tags = []

export let picker = {
    relevantTo: [{ value: 'INFANCY', name: term('infancy') },
    { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
    { value: 'ALL_FAMILY', name: term('all_family') },
    { value: 'GROUPS', name: term('groups') },
    { value: 'GOLDEN_AGE', name: term('golden_age') },],
    authorityId: [],
    categoryId: [],
    currency: [{ value: 'ILS', name: 'ILS' },
    { value: 'USD', name: 'USD' },
    { value: 'EUR', name: 'EUR' }]
};

export const mediaUploadSections = [
    {
        title: term('image'),
        type: "image",
        fileTypes: ["JPG", "PNG", "GIF"],
    },
    {
        title: term('upload_video'),
        type: "video",
        fileTypes: ["MP4", "AVI", "WMV"],
    },
]


export const clearButtonId = '.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator'