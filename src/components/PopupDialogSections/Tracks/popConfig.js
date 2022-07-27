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
    { title: term('points_of_intrest'), id: createRandomId(), field: 'pois', rows: 1, maxRows: 1, size: 'medium', type: 'picker' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'medium', type: 'textAreaSizeable' },
    { title: term('time'), id: createRandomId(), field: 'timeDurationDays', rows: 1, maxRows: 1, size: 'medium', type: 'picker' },
    { title: term('image'), id: createRandomId(), field: 'image', rows: 1, maxRows: 1, size: 'medium', type: 'imagePicker' },
    { title: term('featured'), id: createRandomId(), field: 'featured', rows: 1, maxRows: 1, size: 'small', type: 'checkbox' },
    { title: term('hidden'), id: createRandomId(), field: 'hidden', rows: 1, maxRows: 1, size: 'small', type: 'checkbox' },
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
