import term from "../../../terms";
import { createRandomId } from "../../../utils/randomId"

export const ModalTabs = [term('details')]
export const ModalInit = [
    { title: term('email'), id: createRandomId(), field: 'email', rows: 1, maxRows: 4, size: 'medium', type: 'textfield' },
    { title: term('roles'), id: createRandomId(), field: 'roles', rows: 1, maxRows: 4, size: 'medium', type: 'picker' },
    { title: term('send_mail'), id: createRandomId(), field: 'send_mail', rows: 1, maxRows: 4, size: 'medium', type: 'send_mail_button' },
]