import term from '../../../terms';
import ImageRenderer from './CellRenderers/ImageRenderer'
import CopyRenderer from './CellRenderers/CopyRenderer'
import StatusRenderer from './CellRenderers/StatusRenderer'

const cellStyle = {
    display: 'flex',
    alignItems: 'center',
}

export const rowData = [
    { image: "https://theblondebuckeye.com/wp-content/uploads/2022/03/gherkins-featured-735x490.jpg", name: "חמוצים", description: 'אחלה חמוצים', category: 'אוכל', tags: 'אוכל', created_at: '10.10.22', status: "PENDING_APPROVAL" },
    { image: "https://m.media-amazon.com/images/I/713+eJKOmiL._AC_SL1500_.jpg", name: "שידה", description: 'שידת איפור', category: 'מוצרים לבית', tags: 'תגיות', created_at: '10.10.22', status: "PUBLIC" },
    { image: "https://m.media-amazon.com/images/I/713+eJKOmiL._AC_SL1500_.jpg", name: "שידה", description: 'שידת איפור', category: 'מוצרים לבית', tags: 'תגיות', created_at: '10.10.22', status: "PRIVATE" },
    { image: "https://m.media-amazon.com/images/I/713+eJKOmiL._AC_SL1500_.jpg", name: "שידה", description: 'שידת איפור', category: 'מוצרים לבית', tags: 'תגיות', created_at: '10.10.22', status: "PENDING_APPROVAL" },
    { image: "https://m.media-amazon.com/images/I/713+eJKOmiL._AC_SL1500_.jpg", name: "שידה", description: 'שידת איפור', category: 'מוצרים לבית', tags: 'תגיות', created_at: '10.10.22', status: "PENDING_APPROVAL" },
]

const columnDefs = [
    {
        headerName: term('status'),
        field: 'status',
        resizable: true,
        cellStyle: cellStyle,
        cellRenderer: StatusRenderer
    },
    {
        headerName: term('image'),
        field: 'image',
        resizable: true,
        cellRenderer: ImageRenderer,
        cellStyle: cellStyle,
    },
    {
        headerName: term('name'),
        field: 'name',
        resizable: true,
        cellStyle: cellStyle,
    },
    {
        headerName: term('description'),
        field: 'description',
        resizable: true,
        cellStyle: cellStyle,
    },
    {
        headerName: term('category'),
        field: 'category',
        resizable: true,
        cellStyle: cellStyle,
    },
    {
        headerName: term('tags'),
        field: 'tags',
        resizable: true,
        cellStyle: cellStyle,
    },
    {
        headerName: term('created_at'),
        field: 'created_at',
        resizable: true,
        cellStyle: cellStyle,
    },
    {
        headerName: term('duplicate'),
        field: 'duplicate',
        resizable: false,
        cellStyle: { ...cellStyle, justifyContent: 'center ' },
        cellRenderer: CopyRenderer,
    },
]

export const gridOptions = {
    columnDefs: columnDefs,
    enableRtl: true,
    rowHeight: 100,
}