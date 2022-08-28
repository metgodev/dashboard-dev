import term from "../../../../terms"

export const validate = (values) => {
    if (!values.name) {
        return { name: term('please_enter_a_name') }
    }
    if (values.price < 0) {
        return { price: term('please_enter_a_price') }
    }
    if (!values.shipmentType) {
        return { shipmentType: term('please_choose_shipment_type') }
    }
}