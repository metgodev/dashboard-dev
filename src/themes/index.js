import defaultTheme from "./default";
import dark from "./dark";

import { createTheme } from "@material-ui/core";
import { dir } from "../utils/dir";


const overrides = {
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.64rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.285rem",
    },
    h6: {
      fontSize: "1.142rem",
    },
  },
};

let { lang } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer'))

export default {
  default: createTheme({ ...defaultTheme, ...overrides, direction: dir(lang), }),
  dark: createTheme({ ...dark, ...overrides, direction: dir(lang), }),
};
