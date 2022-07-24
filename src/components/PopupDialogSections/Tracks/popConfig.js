import term from "../../../terms";
import { createRandomId } from "../../../utils/randomId";

export const FormTabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];

export const ModalTabs = [term('locations')]
export const ModalInit = [
    // ------------------ info ------------------
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 1, size: 'medium', type: 'textfield' },
    { title: term('for_whom'), id: createRandomId(), field: 'relevantTo', rows: 1, maxRows: 1, size: 'medium', type: 'tagsPicker' },
    { title: term('authority'), id: createRandomId(), field: 'authorityId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('time_duration_days'), id: createRandomId(), field: 'timeDurationDays', rows: 1, maxRows: 1, size: 'small', type: 'number' },
    { title: term('time_duration_hours'), id: createRandomId(), field: 'timeDurationHours', rows: 1, maxRows: 1, size: 'small', type: 'number' },
    { title: term('time_duration_minutes'), id: createRandomId(), field: 'timeDurationMinutes', rows: 1, maxRows: 1, size: 'small', type: 'number' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'medium', type: 'textAreaSizeable' },
    { title: term('point_of_intrest'), id: createRandomId(), field: 'pois', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('featured'), id: createRandomId(), field: 'featured', rows: 1, maxRows: 1, size: 'small', type: 'checkbox' },
    // ------------------ map ------------------
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 4, size: 'medium', type: 'googleAutocomplete', required: true },
    { title: term('location_name'), id: createRandomId(), field: 'locationName', rows: 1, maxRows: 4, size: 'medium', type: 'textfield', required: false },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'large', type: 'MapPicker', required: false },
]


export const mediaTabConfig = {
    mediaTypes: [
        {
            title: term('image'),
            type: "image",
            fileTypes: ["JPG", "PNG", "GIF"],
        },
        {
            title: term('video'),
            type: "video",
            fileTypes: ["MP4", "AVI", "WMV"],
        },
    ],
    initialMediaType: "image",
}
