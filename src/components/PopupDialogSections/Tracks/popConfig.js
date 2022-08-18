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
    { title: term('time'), id: createRandomId(), field: 'time', rows: 1, maxRows: 1, size: 'medium', type: 'picker' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'medium', type: 'textAreaSizeable' },
    { title: term('points'), id: createRandomId(), field: 'objectIds', rows: 1, maxRows: 1, size: 'medium', type: 'draggableListWithPickerAndImages' },
    { title: term('short_description'), id: createRandomId(), field: 'shortDescription', rows: 4, maxRows: 4, size: 'medium', type: 'textfield' },
    { title: term('pinned'), id: createRandomId(), field: 'isRecommended', rows: 1, maxRows: 1, size: 'small', type: 'checkbox' },
    { title: term('hidden'), id: createRandomId(), field: 'isHidden', rows: 1, maxRows: 1, size: 'small', type: 'checkbox' },
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
