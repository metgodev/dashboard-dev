
import axios from 'axios'
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client'


let dev = false
let token = ''
let uri = dev ? 'http://localhost:3030' : 'https://metro-backend-ohx3vk2ipa-ew.a.run.app'

const app = feathers()
    .configure(auth())

const restClient = rest(uri)

export const Auth = async (email, password) =>
    app.authenticate({
        strategy: 'local',
        email,
        password
    }).then((res) => {
        return res;
    }).catch(e => {
        return { error: true, message: e };
    });

export const client = app.configure(restClient.axios(axios.create({
    baseURL: uri,
    headers: {
        Authorization: `Bearer ${token}`
    }
})));

export const metro = axios.create({
    baseURL: uri,
    headers: {
        Authorization: `Bearer ${token}`
    }
});


 // let res = await client.service('authentication').create({ email, password, strategy: "local" })
