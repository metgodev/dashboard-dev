
import axios from 'axios'
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client'
import JWT from 'jwt-client'

const { REACT_APP_STRAPI } = process.env

let verified;
let token = localStorage.getItem('metgo-jwt');
const uri = REACT_APP_STRAPI;

const app = feathers();
const restClient = rest(uri)

app.configure(restClient.axios(axios));
app.configure(auth({ storage: window.localStorage, storageKey: 'metgo-jwt' }));

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
        if (err) return app.logout();
    });
}

export default app;


export const isVerified = () => {
    token = localStorage.getItem('metgo-jwt')
    verified = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')).user.v
    if (!token || !!!verified) return false
    else if (JWT.validate(token)) return JWT.validate(token)
    else return false
}

export const isLoggedIn = () => {
    let token = localStorage.getItem('metgo-jwt')
    if (token) return true
    else return false
}


// .find()	GET	/messages
// .get()	GET	/messages/1
// .create()	POST	/messages
// .update()	PUT	/messages/1
// .patch()	PATCH	/messages/1
// .remove()	DELETE	/messages/1


