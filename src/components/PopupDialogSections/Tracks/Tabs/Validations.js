import term from "../../../../terms";

export async function validateForm(values) {
    if (!values.name) {
        return { name: term("please_enter_a_name") };
    }
    if (!values.time) {
        return { time: term("please_choose_a_time_frame") };
    }
}