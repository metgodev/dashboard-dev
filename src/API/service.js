import client from './metro';

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
