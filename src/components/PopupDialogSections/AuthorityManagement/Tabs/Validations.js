import term from "../../../../terms"
import { validateIsraelPhoneNumber } from '../../../../utils/validate_phone';

export const validateForm = (values) => {
    if (!values.name) {
        return { name: term('please_enter_an_authority_name') }
    }
    if (values.phoneNumber && !validateIsraelPhoneNumber(values.phoneNumber)) {
        return { phoneNumber: term("please_enter_a_valid_phone_number") }
    }
}