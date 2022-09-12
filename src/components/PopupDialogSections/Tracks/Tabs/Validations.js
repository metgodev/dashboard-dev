import term from "../../../../terms";

const MAXIMUM_BUSINESS_NAME_LENGTH = 16

export async function validateForm(values) {
    if (!values.name) {
        return { name: term("please_enter_a_name") };
    }
    if (!values.time) {
        return { time: term("please_choose_a_time_frame") };
    }
    if (values.name.length > MAXIMUM_BUSINESS_NAME_LENGTH) {
        return { name: term('business_name_cannot_exceed') + " " + MAXIMUM_BUSINESS_NAME_LENGTH + " " + term('characters') }
    }
}