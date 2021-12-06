const rtlLanguages = ["ar", 'he']

export default function setPageDirection(language) {
    const dir = rtlLanguages.includes(language) ? "rtl" : "ltr"
    document.documentElement.dir = dir
}