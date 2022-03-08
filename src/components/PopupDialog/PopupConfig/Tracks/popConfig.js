import { client } from "../../../../API/metro";
import term from "../../../../terms";
import { createRandomId } from "../../../../utils/randomId";


(async () => {
    let area_id = localStorage.getItem('aid')
    client.service("authorities").find({ query: { areaId: area_id } })
        .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
        .then((authorities => picker.authorityId = authorities))
})();


export const ModalTabs = [term('locations')]
export const ModalInit = [
    { title: term('name'), id: createRandomId(), field: 'trackName', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('time_duration_days'), id: createRandomId(), field: 'timeDurationDays', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('time_duration_hours'), id: createRandomId(), field: 'timeDurationHours', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('time_duration_minutes'), id: createRandomId(), field: 'timeDuraionMinutes', rows: 1, maxRows: 1, size: 'small', type: 'textfield' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('point_of_intrest'), id: createRandomId(), field: 'pois', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('featured'), id: createRandomId(), field: 'featured', rows: 1, maxRows: 1, size: 'small', type: 'toggle' },
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

