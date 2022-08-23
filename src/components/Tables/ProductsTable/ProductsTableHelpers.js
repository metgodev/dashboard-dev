import toast from "react-hot-toast"
import { _patch } from "../../../API/service"
import term from "../../../terms";
import { SERVICE } from "./productsTableConfig"

const tost = (e) => toast(term(e));


export const updateStringValue = async (id, field, params) => {
    try {
        const res = await _patch(SERVICE, id, { [field]: params.newValue })
        if (res) {
            params.data[field] = params.newValue
            params.api.refreshCells({
                rowNodes: [params.node],
                columns: [params.column]
            });
            return true
        } else {
            return false
        }
    } catch (e) {
        tost('something_went_wrong')
        return false
    }
}

export const updateNumberValue = async (id, field, params) => {
    try {
        if (isNaN(parseInt(params.newValue))) {
            tost('please_enter_a_valid_number')
            return false
        }
        const res = await _patch(SERVICE, id, { [field]: params.newValue })
        if (res) {
            params.data[field] = params.newValue
            params.api.refreshCells({
                rowNodes: [params.node],
                columns: [params.column]
            });
            return true
        } else {
            return false
        }
    } catch (e) {
        tost('something_went_wrong')
        return false
    }
}

export const updateEnumValue = async (id, field, newValue, params) => {
    try {
        const res = await _patch(SERVICE, id, { [field]: newValue })
        if (res) {
            params.data[field] = newValue
            params.api.refreshCells({
                rowNodes: [params.node],
                columns: [params.column]
            });
            return true
        } else {
            return false
        }
    } catch (e) {
        tost('something_went_wrong')
        return false
    }
}