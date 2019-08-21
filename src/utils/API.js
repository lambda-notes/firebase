import axios from 'axios';

export default axios.create({
    baseURL: 'https://us-central1-lambda-notes-245416.cloudfunctions.net/api',
    responseType: 'json'
});
