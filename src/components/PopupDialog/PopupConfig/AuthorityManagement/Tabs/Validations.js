import term from "../../../../../terms"

export const validateForm = (values) => {
    if (!values.areaId) {
        return { areaId: term('please_choose_an_area') }
    }
    if (!values.name) {
        return { name: term('please_enter_an_authority_name') }
    }
}