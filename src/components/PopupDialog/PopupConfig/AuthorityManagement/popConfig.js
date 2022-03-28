import client from "../../../../API/metro";
import term from "../../../../terms";
import { createRandomId } from "../../../../utils/randomId"

(async () => {
    client.service("area").find().then((res) => {
        res?.data.map(({ name, _id }) => picker.areaId = [...picker.areaId, { value: _id, name }])
    })
})();

export const ModalTabs = [term('details')]
export const ModalInit = [
    { title: term('area'), id: createRandomId(), field: 'areaId', rows: 1, maxRows: 4, size: 'small', type: 'picker' },
    { title: term('phone_number'), id: createRandomId(), field: 'phoneNumber', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('email_address'), id: createRandomId(), field: 'email', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('address'), id: createRandomId(), field: 'address', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
]


export let picker = {
    areaId: []
};

