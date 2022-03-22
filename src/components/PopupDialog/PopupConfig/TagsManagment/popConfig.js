import { client } from "../../../../API/metro";
import term from "../../../../terms";


(async () => {
    await client.service("categories").find().then(({ data }) => {
        data.map(({ title, _id }) => picker.categoryIds = [...picker.categoryIds, { value: _id, name: term(title.toLowerCase()) }])
    })
    await client.service("tags").find().then(({ data }) => {
        data.map(({ title, _id }) => picker.tagsIds = [...picker.tagsIds, { value: _id, name: title }])
    })
})();

export const ModalTabs = [term('details')]

export const ModalInit = [
    { title: term('category_id'), id: 1, field: 'categoryIds', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('tag_name'), id: 2, field: 'title', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
]

export const LinkingModalInit = [
    { title: term('category_id'), id: 1, field: 'categoryIds', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('tag_name'), id: 2, field: 'tagsIds', rows: 1, maxRows: 4, size: 'small', type: 'picker' },
]

export let picker = {
    tagsIds: [],
    categoryIds: [],
};

export let categories = [];

