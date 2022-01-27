import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    let areaId = localStorage.getItem('aid')
    client.service("authorities").find({ query: { areaId: areaId } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.authorityId = authorities))
})();


export const ModalTabs = [term('locations')]
export const ModalInit = [
    { title: term('name'), id: 1, field: 'trackName', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('authority'), id: 2, field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('for_whom'), id: 3, field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('time_duration_days'), id: 4, field: 'timeDurationDays', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('time_duration_hours'), id: 5, field: 'timeDurationHours', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('time_duration_minutes'), id: 6, field: 'timeDuraionMinutes', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('description'), id: 7, field: 'description', rows: 4, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('point_of_intrest'), id: 8, field: 'pois', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('featured'), id: 9, field: 'featured', rows: 1, maxRows: 1, size: 'small', type: 'toggle' },
]

export const picker = {
    relevantTo: [{ value: 'INFANCY', name: term('infancy') },
    { value: 'KIDS&YOUTH', name: term('kids_and_youth') },
    { value: 'ALL_FAMILY', name: term('all_family') },
    { value: 'GROUPS', name: term('groups') },
    { value: 'GOLDEN_AGE', name: term('golden_age') },],
    authorityId: [],
    pois: [{ value: 'something', name: 'something' }]
};

