import axios from 'axios';
import {baseUrl, initialHeaders} from '../config';

import { toast } from 'react-toastify';

const get = (apiEndpoint, responseType='json') => {
    let headers = initialHeaders();
    return axios.get(
        baseUrl+apiEndpoint, 
        { headers, responseType }
    )
    .then((response) => {return response})
}


const remove = (apiEndpoint) => {
    let headers = initialHeaders();
    return axios.delete(baseUrl+apiEndpoint, { headers })
    .then((response) => {return response})
    .catch((err) => { return err.response });
}

const post = (apiEndpoint, payload) => {
    let headers = initialHeaders();
    return axios.post(baseUrl + apiEndpoint, payload, { headers })
    .then((response) => { 
        toast.success(response.statusText, {
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        }); 
        return response
     })
    .catch((err) => { 
        const message = Object.values(err.response.data)[0][0]
        toast.error(message, {
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
     });
}

const postMultiData = (apiEndpoint, payload) => {
    let headers = initialHeaders();
    headers['Content-Type'] = 'multipart/form-data';
    return axios.post(baseUrl + apiEndpoint, payload, { headers })
    .then((response) => { return response })
    .catch((err) => { return err.response });
}

const put = (apiEndpoint, payload) => {
    let headers = initialHeaders();
    return axios.put(baseUrl + apiEndpoint, payload, { headers })
    .then((response) => { return response })
    .catch((err) => { return err.response });
}

export const Service = {
    get,
    remove,
    post,
    put,
    postMultiData,
}
