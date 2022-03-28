
import axios from 'axios'
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client'
import JWT from 'jwt-client'

const { REACT_APP_STRAPI } = process.env

let token = localStorage.getItem('fethers-jwt');
let verified;
let uri = REACT_APP_STRAPI;

const app = feathers()
    .configure(auth())

const restClient = rest(uri)

export const Auth = async (access_token) =>
    app.authenticate({
        strategy: 'firebase',
        access_token
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
        if (err) return client.logout();
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
    token = localStorage.getItem('fethers-jwt')
    verified = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')).user.v
    if (!token || !!!verified) return false
    else if (JWT.validate(token)) return JWT.validate(token)
    else return false
}

export const isLoggedIn = () => {
    return true
}

// export const isLoggedIn = () => {
//     if (!token) return false
//     else return true
// }



// .find()	GET	/messages
// .get()	GET	/messages/1
// .create()	POST	/messages
// .update()	PUT	/messages/1
// .patch()	PATCH	/messages/1
// .remove()	DELETE	/messages/1