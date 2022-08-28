import toast from "react-hot-toast";
import term from "../terms";
import ERRORS from "../data/errors";

const Toast = (message, style, isTerm) => {
    if (message === undefined) {
        toast(term(ERRORS.GENERAL), style)
        return
    }
    else if (isTerm === false) {
        toast(message, style)
        return
    }
    else {
        toast(term(message), style)
        return
    }
}

export default Toast