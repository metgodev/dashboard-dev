
import axios from 'axios'

let token = ''
let uri = 'https://metro-backend-ohx3vk2ipa-ew.a.run.app/'

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        Authorization: `Bearer ${token}`
    }
})


// const feathers = require('@feathersjs/feathers');
// const rest = require('@feathersjs/rest-client');

// const app = feathers();

// // Connect to a different URL
// const restClient = rest(uri)

// // Configure an AJAX library (see below) with that client
// app.configure(restClient.axios(axios));

// // Connect to the uri service
// const messages = app.service('messages');

// app.service('messages').create({
//     text: 'A message from a REST client'
// }, {
//     headers: { 'X-Requested-With': 'FeathersJS' }
// });

// app.configure(restClient.request(request));

// app.service('messages').get(1, {
//     connection: {
//         followRedirect: false
//     }
// });
