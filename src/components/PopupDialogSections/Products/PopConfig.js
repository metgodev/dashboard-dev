import term from "../../../terms"
import { createRandomId } from "../../../utils/randomId"

export const ModalTabs = [term('details'), term('images')]
export const ModalInit = [
    // ------------------ info ------------------
    { title: term('name'), id: createRandomId(), field: 'name', rows: 1, maxRows: 1, size: 'medium', type: 'textfield' },
    { title: term('product_components'), id: createRandomId(), field: 'productComponents', rows: 4, maxRows: 4, size: 'medium', type: 'textfield' },
    { title: term('product_includes'), id: createRandomId(), field: 'productIncludes', rows: 1, maxRows: 1, size: 'medium', type: 'textfield' },
    { title: term('description'), id: createRandomId(), field: 'description', rows: 4, maxRows: 4, size: 'medium', type: 'textAreaSizeable' },
    { title: term('shipment_type'), id: createRandomId(), field: 'shipmentType', rows: 1, maxRows: 1, size: 'medium', type: 'picker' },
    { title: term('size_and_dimension'), id: createRandomId(), field: 'sizeAndDimension', rows: 1, maxRows: 1, size: 'medium', type: 'textfield' },
    { title: term('style'), id: createRandomId(), field: 'style', rows: 1, maxRows: 1, size: 'medium', type: 'textfield' },
    { title: term('tags'), id: createRandomId(), field: 'tags', rows: 1, maxRows: 1, size: 'medium', type: 'tagsPicker' },
    { title: term('usage_restrictions'), id: createRandomId(), field: 'useageRestrictions', rows: 1, maxRows: 1, size: 'medium', type: 'textfield' },
    { title: term('in_stock'), id: createRandomId(), field: 'inStock', rows: 1, maxRows: 1, size: 'small', type: 'checkbox' },
    { title: term('price'), id: createRandomId(), field: 'price', rows: 1, maxRows: 1, size: 'small', type: 'number' },
]

export const mediaTabConfig = {
    mediaTypes: [
        {
            title: term('images'),
            type: "image",
            fileTypes: ["JPG", "PNG", "JPEG"],
        },
    ],
    initialMediaType: {
        title: term('images'),
        type: "image",
        fileTypes: ["JPG", "PNG", "JPEG"],
    }
}

export const Picker = {
    tags: [],
    shipmentType: [
        { value: 'DROPOFF', name: term('dropoff') },
        { value: 'PAYED_SHIPPING', name: term('payed_shipping') },
        { value: 'PICKUP', name: term('pickup') },
        { value: 'FREE_SHIPPING', name: term('free_shipping') },
    ],
};