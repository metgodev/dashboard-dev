import term from '../../../../terms'

const MAXIMUM_BUSINESS_NAME_LENGTH = 30

export async function validateFirstFormPart(values) {
    if (!values.name) {
        return { name: term('please_enter_a_name') }
    }
    if (values.name.length > MAXIMUM_BUSINESS_NAME_LENGTH) {
        return { name: term('name_cannot_exceed') + " " + MAXIMUM_BUSINESS_NAME_LENGTH + " " + term('characters') }
    }
    if (!values.authorityId) {
        return { authorityId: term('please_choose_an_authority') }
    }
}

export async function validateSecondFormPart(values) {

}

export async function validateThirdFormPart(values) {

}