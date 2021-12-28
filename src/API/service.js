
import { handleError, handleResponse } from './response';
import metro from './metro';

//example for request
// (async () => {
//     apiProvider.getSingle('todos', 1).then(res => console.log(res));
// })();


//read
const getAll = async (resource, params = {}) => {
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
const post = async (resource, payload) => {
    try {
        const res = await metro
            .post(`/${resource}`, payload);
        return handleResponse(res);
    } catch (error) {
        return handleError(error);
    }
};

//ubdate
const patch = async (resource, payload) => {
    try {
        const res = await metro
            .put(`/${resource}`, payload);
        return handleResponse(res);
    } catch (error) {
        return handleError(error);
    }
};

//ubdate
const put = async (resource, payload) => {
    try {
        const res = await metro
            .patch(`/${resource}`, payload);
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
    patch,
    del,
};