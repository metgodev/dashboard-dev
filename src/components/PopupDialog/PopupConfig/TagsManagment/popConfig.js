import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    await client.service("categories").find().then(({ data }) => {
        data.map(({ title, _id }) => categories = [...categories, { id: _id, title: term(title.toLowerCase()) }])
    })
})();

export const ModalTabs = [term('details')]
export const ModalInit = [
    { title: term('category_id'), id: 2, field: 'categoryId', rows: 1, maxRows: 1, size: 'small', type: 'tagsPicker' },
    { title: term('tag_name'), id: 3, field: 'title', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
]

export let picker = {
    areaId: [],
};

export let categories = [];

