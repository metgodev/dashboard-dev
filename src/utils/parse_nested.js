const x = (obj) => {
    // loop on nested object and chack if one of the value is object
    for (let key in obj) {
        if (isJsonString(obj[key])) {
            obj[key] = JSON.parse(obj[key])
        }
    }
    return obj
}
export default x


const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}