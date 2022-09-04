import term from "../../../../terms"

export const validate = (values) => {
    if (!values.email) {
        return ({ email: term('please_enter_a_valid_email_address') })
    }
    if (!values.roles.includes('61d2e32a04f66555eab743fc')) {
        return ({ roles: term('every_user_must_be_a_member') })
    }
    if (values.roles.length > 2) {
        return ({ roles: term('please_choose_one_extra_role_per_user') })
    }
}