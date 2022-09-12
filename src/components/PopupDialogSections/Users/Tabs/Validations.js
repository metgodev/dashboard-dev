import term from "../../../../terms"

export const validate = (values) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        return { email: term("please_enter_a_valid_email_address") }
    }
}