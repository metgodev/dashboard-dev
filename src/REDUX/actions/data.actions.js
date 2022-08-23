export const SET_APP_DATA = 'SET_APP_DATA';
export const SET_COPY_PRODUCT_DATA = 'SET_COPY_PRODUCT_DATA';

export const set_app_data = (value) => ({
    type: SET_APP_DATA,
    payload: value
})

export const set_copy_product_data = (value) => ({
    type: SET_COPY_PRODUCT_DATA,
    payload: value
})
