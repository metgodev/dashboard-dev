const rtlLanguages = ["ar", 'he']

export function setPageDirection(language) {
    const dir = rtlLanguages.includes(language) ? "rtl" : "ltr"
    document.documentElement.dir = dir
}


export function dir(language) {
    const d = rtlLanguages.includes(language) ? "rtl" : "ltr"

    return d
}

