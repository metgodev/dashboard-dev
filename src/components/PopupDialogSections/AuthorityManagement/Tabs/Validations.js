import term from "../../../../terms"

export const validateForm = (values) => {
    if (!values.name) {
        return { name: term('please_enter_an_authority_name') }
    }
}