import client from './metro';
import axios from 'axios';

export const _get = async (service, options) => {
    const res = await client.service(service).find({ query: { ...options } })
    return res;
}

export const _post = async (service, data, _areaId) => {
    const res = await client.service(service).create(data, { areaId: _areaId })
    return res;
}

export const _put = async (service, data, _areaId) => {
    const res = await client.service(service).update(data, { areaId: _areaId })
    return res;
}

export const _delete = async (service, id, _areaId) => {
    const res = await client.service(service).remove(id, { areaId: _areaId })
    return res;
}

export const _search = async (service, options) => {
    const res = await client.service(service).find({ query: { ...options } })
    return res;
}

export const _patch = async (service, id, data) => {
    const res = await client.service(service).patch(id, data)
    return res
}

export const uploadImageToFirebase = async (formData, areaId) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_STRAPI}/files`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: window.localStorage.getItem("metgo-jwt")
                },
                params: {
                    areaId: areaId
                }
            })
        if (res) {
            return res
        }
    } catch (e) {
        console.log(e)
    }
}

export const getApplicationActiveUsersByDate = async (startDate, endDate) => {
    try {
        const res = await axios.post(`https://us-central1-metro-travel-dev.cloudfunctions.net/amplitude-get-number-of-users-by-dates`, { startDate, endDate })
        if (res && res.data) {
            return res.data
        }
    } catch (e) {

    }
}
