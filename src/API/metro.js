
import axios from 'axios'
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client'
import JWT from 'jwt-client'

let dev = false;
let token = localStorage.getItem('feathers-jwt');
let verified;
let uri = dev ? 'http://localhost:3030' : 'https://metro-backend-ohx3vk2ipa-ew.a.run.app';

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

export const reAuth = async () => {
    app.reAuthenticate().then((res) => {
        token = res.accessToken;
        verified = res.isVerified;
    }).catch((err) => {
        client.logout();
    });
}

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

//jwt
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
    if (!token) return false
    else if (JWT.validate(token)) return JWT.validate(token)
    else return false
}



// .find()	GET	/messages
// .get()	GET	/messages/1
// .create()	POST	/messages
// .update()	PUT	/messages/1
// .patch()	PATCH	/messages/1
// .remove()	DELETE	/messages/1