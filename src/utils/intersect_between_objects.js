export default (arr, obj, key) => {
    return arr.map((id) => {
        let match = obj.find((o) => o.id === id);
        return match ? `${match[key]}, ` : '';
    });
}