import term from "../../../terms";
import { createRandomId } from "../../../utils/randomId"

export const ModalTabs = [term('details')]
export const ModalInit = [
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 4, size: 'medium', type: 'textfield' },
    { title: term('location'), id: createRandomId(), field: 'location', rows: 1, maxRows: 4, size: 'medium', type: 'googleAutocomplete' },
]