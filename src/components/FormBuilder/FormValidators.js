import Notify from "../../pages/notifications/Notifications"
import { camelToSnakeCase } from "../../utils/camelToSnakeCase"
import { toast } from 'react-toastify';
import term from "../../terms"

export const helperText = (name) => {
    let helperText = `${camelToSnakeCase(name)}_helper`
    return term(helperText)
}

export const allRequiredFiledsAreNotEmpty = (values, ModalInit, type) => {
    if (type === "edit") return;
    const requiredFields = ModalInit.filter(({ required }) => required)
    const requierdValuesAreNotEmpty = requiredFields.every(({ field }) => values[field] !== undefined && values[field] !== "" && values[field] !== null)
    const filedsNamesThatAreNotFiled = requiredFields.filter(({ field }) => values[field] === undefined || values[field] === "" || values[field] === null)
    toast.error(`${term('please_fill_all_required_fields')}
     ${filedsNamesThatAreNotFiled.map(({ title }) => title.toUpperCase()).join(", ")}`, {
        theme: 'colored',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    return !requierdValuesAreNotEmpty
}

export const FormValidator = (rule, value) => {
    switch (rule) {
        case 'requierd':
            !value && Notify(`${value}${term('is_requierd')}`, 'error', Math.random())
            return !value
        case 'email':
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && Notify(`${value}${term('email_is_not_valid')}`, 'error', Math.random())
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        case 'phone':
            /^\d{10}$/.test(value) && Notify(`${value}${term('phone_is_not_valid')}`, 'error', Math.random())
            return /^\d{10}$/.test(value)
        case 'number':
            !isNaN(value) && Notify(`${value}${term('is_not_number')}`, 'error', Math.random())
            return !isNaN(value)
        default:
            break;
    }
}
