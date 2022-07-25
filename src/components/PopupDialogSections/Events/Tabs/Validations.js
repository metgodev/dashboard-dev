import term from '../../../../terms'
import { removeSpacesFromBeginingAndEndOfString } from '../../../../utils/string_parse'

const MAXIMUM_BUSINESS_NAME_LENGTH = 30
const MAXIMUM_AMMOUNT_OF_WORDS_SHORT_DESCRIPTION = 4
const MAXIMUM_AMMOUNT_OF_TAGS = 5

export async function validateFirstFormPart(values) {
    if (!values.name) {
        return { name: term('please_enter_an_event_name') }
    }
    if (values.name.length > MAXIMUM_BUSINESS_NAME_LENGTH) {
        return { name: term('name_cannot_exceed') + " " + MAXIMUM_BUSINESS_NAME_LENGTH + " " + term('characters') }
    }
    if (!values.authorityId) {
        return { authorityId: term('please_choose_an_authority') }
    }
    if (!values.shortDescription) {
        return { shortDescription: term('please_add_a_short_description') }
    }
    if (removeSpacesFromBeginingAndEndOfString(values.shortDescription).split(" ").length > 4) {
        return {
            shortDescription: term('short_description_cannot_exceed') + " " + MAXIMUM_AMMOUNT_OF_WORDS_SHORT_DESCRIPTION + " " + term('words')
        }
    }
    if (values.tagsIds.length < 1) {
        return { tagsIds: term('please_choose_at_least_one_tag') }
    }
    if (values.tagsIds.length > 5) {
        return { tagsIds: term(`please_choose_up_to`) + ` ${MAXIMUM_AMMOUNT_OF_TAGS} ` + term('tags') }
    }
    if (!values.reservations || values.reservations.length < 1) {
        return { reservations: term('please_choose_a_resevation_option') }
    }
    if (values.price && values.free) {
        return { free: term('cant_be_free_and_have_a_price') }
    }
}
export async function validateSecondFormPart(values) {

}
export async function validateThirdFormPart(values) {

}