import term from "../../../../terms";

export const ModalTabs = [term('details')]

export const ModalInit = [
    { title: term('category_id'), id: 1, field: 'categoryId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('tag_name'), id: 2, field: 'title', rows: 1, maxRows: 4, size: 'small', type: 'textfield' },
]

export const LinkingModalInit = [
    { title: term('category_id'), id: 1, field: 'categoryId', rows: 1, maxRows: 1, size: 'small', type: 'picker' },
    { title: term('tag_name'), id: 2, field: 'tagId', rows: 1, maxRows: 4, size: 'small', type: 'autocomplete' },
]


