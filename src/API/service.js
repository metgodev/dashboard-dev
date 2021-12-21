
import { handleError, handleResponse } from './response';
import metro from './metro';

//example for request
// (async () => {
//     apiProvider.getSingle('todos', 1).then(res => console.log(res));
// })();


//read
const getAll = async (resource) => {
    try {
        const res = await metro
            .get(`/${resource}`);
        return handleResponse(res);
    } catch (error) {
        return handleError(error);
    }
};

//read
const getSingle = async (resource, id) => {
    try {
        const res = await metro
            .get(`/${resource}/${id}`);
        return handleResponse(res);
    } catch (error) {
        return handleError(error);
    }
};

//create
const post = async (resource, body) => {
    try {
        const res = await metro
            .post(`/${resource}`, body);
        return handleResponse(res);
    } catch (error) {
        return handleError(error);
    }
};

//ubdate
const put = async (resource, body) => {
    try {
        const res = await metro
            .put(`/${resource}`, body);
        return handleResponse(res);
    } catch (error) {
        return handleError(error);
    }
};

//delete
const del = async (resource, id) => {
    try {
        const res = await metro
            .delete(`/${resource}`, id);
        return handleResponse(res);
    } catch (error) {
        return handleError(error);
    }
};

export const apiProvider = {
    getAll,
    getSingle,
    post,
    put,
    del,
};