import term from "../../../terms";
import { createRandomId } from "../../../utils/randomId"

export const ModalTabs = [term('details')]
export const ModalInit = [
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 4, size: 'medium', type: 'textfield' },
    { title: term('email'), id: createRandomId(), field: 'address', rows: 1, maxRows: 4, size: 'medium', type: 'textfield' },
    { title: term('phone_number'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 4, size: 'medium', type: 'textfield' },
    { title: term('isAnonymous'), id: createRandomId(), field: 'email', rows: 1, maxRows: 4, size: 'medium', type: 'checkbox' },
]