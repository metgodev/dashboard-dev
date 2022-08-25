import term from '../../../terms';
import ImageRenderer from './CellRenderers/ImageRenderer'
import CopyRenderer from './CellRenderers/CopyRenderer'
import StatusRenderer from './CellRenderers/StatusRenderer'
import InStockRenderer from './CellRenderers/InStockRenderer'
import ShipmentTypeRenderer from './CellRenderers/ShipmentTypeRenderer'
import TagsRenderer from './CellRenderers/TagsRenderer'
import RelevantToRenderer from './CellRenderers/RelevantToRenderer'
import { updateStringValue, updateNumberValue } from './ProductsTableHelpers'

const cellStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
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
        sortable: true,
        cellStyle: { ...cellStyle, cursor: 'auto' },
        cellRenderer: StatusRenderer
    },
    {
        headerName: term('name'),
        field: 'name',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.name
        },
        valueSetter: (params) => {
            updateStringValue(params.data._id, 'name', params)
            return false
        }
    },
    {
        headerName: term('image'),
        field: 'gallery',
        cellRenderer: ImageRenderer,
        resizable: true,
        cellStyle: cellStyle,
    },
    {
        headerName: term('in_stock'),
        field: 'inStock',
        resizable: true,
        sortable: true,
        cellStyle: { ...cellStyle, justifyContent: 'center ' },
        cellRenderer: InStockRenderer,
    },
    {
        headerName: term('tags'),
        field: 'tags',
        cellStyle: cellStyle,
        resizable: true,
        cellRenderer: TagsRenderer
    },
    {
        headerName: term('relevantTo'),
        field: 'relevantTo',
        cellStyle: cellStyle,
        resizable: true,
        cellRenderer: RelevantToRenderer
    },
    {
        headerName: term('size_and_dimension'),
        field: 'sizeAndDimension',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.sizeAndDimension
        },
        valueSetter: (params) => {
            updateStringValue(params.data._id, 'sizeAndDimension', params)
            return false
        }
    },
    {
        headerName: term('style'),
        field: 'style',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.style
        },
        valueSetter: (params) => {
            updateStringValue(params.data._id, 'style', params)
            return false
        }
    },
    {
        headerName: term('usage_restrictions'),
        field: 'useageRestrictions',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.useageRestrictions
        },
        valueSetter: (params) => {
            updateStringValue(params.data._id, 'useageRestrictions', params)
            return false
        }
    },
    {
        headerName: term('shipment_type'),
        field: 'shipmentType',
        valueFormatter: (params) => {
            return term(params.value.toLowerCase())
        },
        resizable: true,
        cellStyle: cellStyle,
        sortable: true,
        cellRenderer: ShipmentTypeRenderer
    },
    {
        headerName: term('price'),
        field: 'price',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.price
        },
        valueSetter: (params) => {
            updateNumberValue(params.data._id, 'price', params)
            return false
        }
    },
    {
        headerName: term('description'),
        field: 'description',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.description
        },
        valueSetter: (params) => {
            updateStringValue(params.data._id, 'description', params)
            return false
        }
    },
    {
        headerName: term('product_components'),
        field: 'productComponents',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.productComponents
        },
        valueSetter: (params) => {
            updateStringValue(params.data._id, 'productComponents', params)
            return false
        }
    },
    {
        headerName: term('product_includes'),
        field: 'productIncludes',
        resizable: true,
        cellStyle: cellStyle,
        editable: true,
        sortable: true,
        valueGetter: (params) => {
            return params.data.productIncludes
        },
        valueSetter: (params) => {
            updateStringValue(params.data._id, 'productIncludes', params)
            return false
        }
    },
    {
        headerName: term('created_at'),
        field: 'createdAt',
        valueFormatter: (params) => {
            if (!params.data) return
            return new Date(params.value).toLocaleString('he-IL')
        },
        resizable: true,
        sortable: true,
        cellStyle: { ...cellStyle, cursor: 'auto' },
    },
    {
        headerName: term('updated_at'),
        field: 'updatedAt',
        valueFormatter: (params) => {
            if (!params.data) return
            return new Date(params.value).toLocaleString('he-IL')
        },
        resizable: true,
        sortable: true,
        cellStyle: { ...cellStyle, cursor: 'auto' },
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