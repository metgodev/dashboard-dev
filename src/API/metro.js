
import axios from 'axios'
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client'

const { REACT_APP_STRAPI } = process.env
const uri = REACT_APP_STRAPI;

const app = feathers();
const restClient = rest(uri)

app.configure(restClient.axios(axios));
app.configure(auth({ storage: window.localStorage, storageKey: 'metgo-jwt' }));

export const Auth = async (access_token) => app.authenticate({
    strategy: 'firebase',
    access_token
}).then((res) => {
    return res;
}).catch(e => {
    return { error: true, message: e };
});

export const reAuth = async () => app.reAuthenticate();

export default app;

