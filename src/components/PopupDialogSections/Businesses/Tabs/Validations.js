import term from '../../../../terms';
import { removeSpacesFromBeginingAndEndOfString } from '../../../../utils/string_parse'
import { validateIsraelPhoneNumber } from '../../../../utils/validate_phone';
const MAXIMUM_BUSINESS_NAME_LENGTH = 30
const MAXIMUM_AMMOUNT_OF_WORDS_SHORT_DESCRIPTION = 4

export async function validateFirstFormPart(values) {
    if (!values.name) {
        return { name: term("please_enter_a_business_name") };
    }
    if (values.name.length > MAXIMUM_BUSINESS_NAME_LENGTH) {
        return { name: term('business_name_cannot_exceed') + " " + MAXIMUM_BUSINESS_NAME_LENGTH + " " + term('characters') }
    }
    if (!values.authorityId) {
        return { authorityId: term("please_choose_an_authority") }
    }
    if (values.isKosher && values.openOnWeekend) {
        return { isKosher: term("you_cant_be_kosher_and_open_on_weekends"), openOnWeekend: term("you_cant_be_kosher_and_open_on_weekends") }
    }
    if (!values.shortDescription) {
        return { shortDescription: term("please_add_a_short_description") }
    }
    if (removeSpacesFromBeginingAndEndOfString(values.shortDescription).split(" ").length > 4) {
        return {
            shortDescription: term('short_description_cannot_exceed') + " " + MAXIMUM_AMMOUNT_OF_WORDS_SHORT_DESCRIPTION + " " + term('words')
        }
    }
    if (!validateIsraelPhoneNumber(values.phoneNumber)) {
        return { phoneNumber: term("please_enter_a_valid_phone_number") }
    }
    if (values.whatsAppPhoneNumber && !validateIsraelPhoneNumber(values.whatsAppPhoneNumber)) {
        return { whatsAppPhoneNumber: term("please_enter_a_valid_phone_number") }
    }
}

export async function validateSeconsFormPart(values) {
    if (!values.contactPersonName) {
        return { contactPersonName: term("please_enter_the_contact_persons_name") }
    }
    if ((values.contactPersonPhoneNumber[0] !== '0' && values.contactPersonPhoneNumber.slice(0, 4) !== "+972") || /[a-zA-Z]/.test(values.contactPersonPhoneNumber) || values.contactPersonPhoneNumber.length < 9) {
        return { contactPersonPhoneNumber: term("please_enter_a_valid_phone_number") }
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.emailAddress)) {
        return { emailAddress: term("please_enter_a_valid_email_address") }
    }
    if (!validateIsraelPhoneNumber(values.contactPersonPhoneNumber)) {
        return { contactPersonPhoneNumber: term("please_enter_a_valid_phone_number") }
    }
}

export async function validateThirdFormPart(values) {

}


export async function validateFirstProductTab(values) {
    if (!values.name) {
        return { name: term("please_enter_a_product_name") };
    }
    if (values.price < 0) {
        return { price: term("please_enter_a_price") };
    }
}

export async function validateSecondProductTab(values) {
    if (!values.shipmentType) {
        return { shipmentType: term('please_choose_shipment_type') }
    }
}