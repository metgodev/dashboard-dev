
import axios from 'axios'
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client'
import JWT from 'jwt-client'
import { b64_to_utf8 } from '../utils/enode';


let dev = false
let token;
let verified;
let uri = dev ? 'http://localhost:3030' : 'https://metro-backend-ohx3vk2ipa-ew.a.run.app'

const app = feathers()
    .configure(auth())

const restClient = rest(uri)

// const reAuth = async () => {
//     app.authentication.getFromLocation(token).then((res) => {
//         console.log(res)
//     }).then((err) => {
//         console.log(err)
//     })
//     app.reAuthenticate().then((res) => {
//         console.log(res)
//     }).catch((e) => {
//         console.log(e)
//     });
// }

// reAuth()

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


JWT.defaults = {
    key: '',
    tokenPrefix: `Bearer ${token}`,
    storage: global.localStorage,
    padding: false
};

export const isVerified = () => {
    token = localStorage.getItem('feathers-jwt')
    verified = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')).user.v
    if (!token || !!!verified) return false
    else if (JWT.validate(token)) return JWT.validate(token)
    else return false
}
export const isLoggedIn = () => {
    token = localStorage.getItem('feathers-jwt')
    if (!token) return false
    else if (JWT.validate(token)) return JWT.validate(token)
    else return false
}
