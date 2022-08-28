import toast from "react-hot-toast";
import term from "../terms";

const Toast = (message, style, term) => {
    if (message === undefined) {
        toast(term('something_went_wrong'), style)
        return
    }
    else if (term === false) {
        toast(message, style)
        return
    }
    else {
        toast(term(message), style)
        return
    }
}

export default Toast