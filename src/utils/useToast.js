import toast from "react-hot-toast";
import term from "../terms";
import ERRORS from "../data/errors";

const Toast = (message, style, isTerm) => {
    toast.remove()
    if (message === undefined) {
        toast(term(ERRORS.GENERAL), style)
    }
    else if (isTerm === false) {
        toast(message, style)
    }
    else {
        toast(term(message), style)
    }
}

export default Toast