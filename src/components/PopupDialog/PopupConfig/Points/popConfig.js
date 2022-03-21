import { client } from "../../../../API/metro";
import term from "../../../../terms";
import { createRandomId } from "../../../../utils/randomId";


(async () => {
    let area_id = localStorage.getItem('aid')
    client.service("authorities").find({ query: { areaId: area_id } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.authorityId = authorities))

    await client.service("categories").find().then((res) => {
        res?.data.map(({ title, _id }) => picker.categoriesIds = [...picker.categoriesIds, { value: _id, name: term(title.toLowerCase()) }])
    })

    // await client.service('area').find({ query: { _id: area_id } })
    //     .then(({ data }) => data[0].tags.map(({ title, _id }) => tags = [...tags, { title, id: createRandomId()id }]));
})();

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [term('points'), term('gallery')]
export const ModalInit = [
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 1, size: 'small', type: 'googleAutocomplete' },
    { title: term('location_name'), id: createRandomId(), field: 'locationName', rows: 1, maxRows: 4, size: 'small', type: 'locationName' },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'small', type: 'MapPicker' },
    // ------------------ map ------------------
    { title: term('name'), id: createRandomId(), field: 'poiName', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('category'), id: createRandomId(), field: 'categoriesIds', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('is_accessable'), id: createRandomId(), field: 'isAccessable', rows: 1, maxRows: 1, size: 'small', type: 'toggle' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 5, maxRows: 5, size: 'small', type: 'textfield' },
    { title: term('site_link'), id: createRandomId(), field: 'websiteUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('activities_in_place'), id: createRandomId(), field: 'activitiesInPlace', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('exclusive_for'), id: createRandomId(), field: 'exclusiveFor', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('preffered_season'), id: createRandomId(), field: 'prefferedSeason', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('shady'), id: createRandomId(), field: 'shady', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('arrival_recommendations'), id: createRandomId(), field: 'arrivalRecommendations', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('phone_number'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('webpage_url'), id: createRandomId(), field: 'webpageUrl', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('contact_email'), id: createRandomId(), field: 'contactEmail', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
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

export const mediaUploadSections = [
    {
        title: term('upload_photo'),
        type: "image",
        fileTypes: ["JPG", "PNG", "GIF"],
    },
    {
        title: term('upload_video'),
        type: "video",
        fileTypes: ["MP4", "AVI", "WMV"],
    },
]