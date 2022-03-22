const x = (obj, exept) => {
    // loop on nested object and chack if one of the value is object
    for (let key in obj) {
        //loop inside the object
        for (let key2 in obj[key]) {
            //check if the value is object exept the exepted value
            if (typeof obj[key][key2] === 'object' && !exept.includes(key2)) {
                //if object convert to object
                obj[key][key2] = JSON.parse(obj[key][key2])
            }
        }
    }
    return obj
}
export default x