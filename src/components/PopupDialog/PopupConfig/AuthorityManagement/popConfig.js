import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    client.service("area").find().then((res) => {
        res?.data.map(({ name, _id }) => picker.areaId = [...picker.areaId, { value: _id, name }])
    })

})();

export const ModalTabs = [term('details')]
export const ModalInit = [
    { title: term('area'), id: 1, field: 'areaId', rows: 1, maxRows: 4, size: 'small', type: 'picker' },
    { title: term('name'), id: 2, field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('email_address'), id: 3, field: 'email', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('address'), id: 4, field: 'address', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
]


export let picker = {
    areaId: []
};



