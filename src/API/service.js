
import { handleError, handleResponse } from './response';
import { header } from './Headers';

//example for request
// (async () => {
//     apiProvider.getSingle('todos', 1).then(res => console.log(res));
// })();




const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getAll = async (resource) => {
    let data = await fetch(`${BASE_URL}/${resource}`, header('GET'))
        .then((res) => res.json())
        .then(handleResponse)
        .catch(handleError)
    return data
};


const getSingle = async (resource, id) => {
    let data = await fetch(`${BASE_URL}/${resource}/${id}`, header('GET'))
        .then((res) => res.json())
        .then(handleResponse)
        .catch(handleError);
    return data
};


const post = async (resource, body) => {
    let data = await fetch(`${BASE_URL}/${resource}`, header('POST', body))
        .then((res) => res.json())
        .then(handleResponse)
        .catch(handleError);
    return data
};


const put = async (resource, body) => {
    let data = await fetch(`${BASE_URL}/${resource}`, header('PUT', body))
        .then((res) => res.json())
        .then(handleResponse)
        .catch(handleError);
    return data
};


const patch = (resource, body) => {
    let data = await
    fetch(`${BASE_URL}/${resource}`, header('PATCH', body))
        .then((res) => res.json())
        .then(handleResponse)
        .catch(handleError);
    return data
};

export const apiProvider = {
    getAll,
    getSingle,
    post,
    put,
    patch,
};