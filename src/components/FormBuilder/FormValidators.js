import Notify from "../../pages/notifications/Notifications"
import { camelToSnakeCase } from "../../utils/camelToSnakeCase"
import { toast } from 'react-toastify';
import term from "../../terms"

export const helperText = (name) => {
    let helperText = `${camelToSnakeCase(name)}_helper`
    return term(helperText)
}

const toastConfig = {
    theme: 'colored',
    position: "top-right",
    hideProgressBar: false,
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const checkRequired = (modal, values) => {
    let requierdfileds = modal.filter(({ required }) => required);
    const check = requierdfileds.every(({ field }) => values[field] && values[field] !== '' && values[field] !== null && values[field] !== undefined);
    let unfullfilled = requierdfileds.filter(({ field }) => !values[field] || values[field] === '' || values[field] === null || values[field] === undefined);
    if (!check) toast.info(`${term('please_fill_all_required_fields')} - ${unfullfilled.map(({ title }) => title).join(', ')}`, toastConfig);
    return check
}

export const FormValidator = (rule, value) => {
    switch (rule) {
        case 'requierd':
            !value && Notify(`${value}${term('is_requierd')}`, 'error', Math.random())
            return !value
        case 'email':
            (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value) && Notify(`${value}${term('email_is_not_valid')}`, 'error', Math.random())
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)
        case 'phone':
            (/^\d{10}$/).test(value) && Notify(`${value}${term('phone_is_not_valid')}`, 'error', Math.random())
            return (/^\d{10}$/).test(value)
        case 'number':
            !isNaN(value) && Notify(`${value}${term('is_not_number')}`, 'error', Math.random())
            return !isNaN(value)
        default:
            break;
    }
}
