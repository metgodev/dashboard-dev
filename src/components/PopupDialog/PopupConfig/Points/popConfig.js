import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    let areaId = localStorage.getItem('aid')
    client.service("authorities").find({ query: { areaId: areaId } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.authorityId = authorities))

    client.service("categories").find().then((res) => {
        res?.data.map(({ title, _id }) => picker.categoriesIds = [...picker.categoriesIds, { value: _id, name: term(title.toLowerCase()) }])
    })

    client.service("tags").find().then((res) => {
        res?.data.map(({ title, _id }) => tags = [...tags, { title, id: _id }])
    })
})();

export const ModalTabs = [term('points')]
export const ModalInit = [
    { title: term('name'), id: 1, field: 'poiName', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('address'), id: 2, field: 'address', rows: 1, maxRows: 1, size: 'small', type: 'googleAutocomplete' },
    { title: term('category'), id: 3, field: 'categoriesIds', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('for_whom'), id: 4, field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('is_accessable'), id: 5, field: 'isAccessable', rows: 1, maxRows: 1, size: 'small', type: 'toggle' },
    { title: term('description'), id: 6, field: 'description', rows: 5, maxRows: 5, size: 'small', type: 'textfield' },
    { title: term('site_link'), id: 7, field: 'websiteUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('authority'), id: 8, field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('activities_in_place'), id: 9, field: 'activitiesInPlace', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('exclusive_for'), id: 10, field: 'exclusiveFor', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('preffered_season'), id: 11, field: 'prefferedSeason', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('shady'), id: 12, field: 'shady', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('arrival_recommendations'), id: 13, field: 'arrivalRecommendations', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('phone_number'), id: 14, field: 'phoneNumber', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('webpage_url'), id: 15, field: 'webpageUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('contact_email'), id: 16, field: 'contactEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
]


export let tags = []

export let picker = {
    relevantTo: [{ value: 'INFANCY', name: term('infancy') },
    { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
    { value: 'ALL_FAMILY', name: term('all_family') },
    { value: 'GROUPS', name: term('groups') },
    { value: 'GOLDEN_AGE', name: term('golden_age') },],
    authorityId: [],
    categoriesIds: [],
    prefferedSeason: [{ value: "SUMMER", name: term('summer') },
    { value: "WINTER", name: term('winter') },
    { value: "FALL", name: term('fall') },
    { value: "SPRING", name: term('spring') }],
    shady: [{ value: "FULL", name: term('full') },
    { value: "PARTIAL", name: term('partial') },
    { value: "NONE", name: term('none') }]
};
