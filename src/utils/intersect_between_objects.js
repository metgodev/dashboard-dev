export default (o1, o2, key) => {
    let output = [];
    Object.keys(o1).filter(k => k in o2 && output.push(`${o2[k][key]}, `));
    return output
}
