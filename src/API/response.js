

export const handleResponse = (res) => {
    if (res.body) {
        return res.body;
    }

    if (res.data) {
        return res.data;
    }

    return res;
}

export const handleError = (error) => {
    if (error.data) {
        return error.data;
    }
    console.log(error)
    return error;
}