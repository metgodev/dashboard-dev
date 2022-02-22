import { client } from "../../API/metro";
import term from "../../terms";

export let tags = [
    { title: term('add_tag'), id: 1, field: 'title', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('category_id'), id: 17, field: 'categoryId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
]

export let add_new_area = [
    { title: term('name'), id: 1, field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
]

export let add_new_authority = [
    { title: term('area'), id: 1, field: 'areaId', rows: 1, maxRows: 4, size: 'small', type: 'picker' },
    { title: term('name'), id: 1, field: 'name', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('email_address'), id: 1, field: 'email', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
    { title: term('address'), id: 1, field: 'address', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
]

