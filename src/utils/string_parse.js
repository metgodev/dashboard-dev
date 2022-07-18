export const removeSpacesFromBeginingAndEndOfString = (string) => {
    if (typeof string !== 'string') return null
    if (string.length === 0) return string
    let stringWithoutSpaces = string;
    while (stringWithoutSpaces[0] === " ") {
        stringWithoutSpaces = stringWithoutSpaces.slice(1)
    }
    while (stringWithoutSpaces[stringWithoutSpaces.length - 1] === " ") {
        stringWithoutSpaces = stringWithoutSpaces.slice(0, stringWithoutSpaces.length - 1)
    }
    return stringWithoutSpaces
}