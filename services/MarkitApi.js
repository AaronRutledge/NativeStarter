// a library to wrap and simplify api calls
import apisauce from 'apisauce';

const create = (baseURL, authToken) => {

    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            
            // 'Authorization' : `Bearer ${authToken}`
        },
        // 10 second timeout...
        timeout: 600000
    })
    // window.api = api;
    // TODO : add token to api.headers
    // Pulling token from sessionStorage to append to requests
    const getData = (endPoint, parameters) => api.get(endPoint, parameters, { withCredentials : false, headers: { 'Authorization': `Bearer ${window.sessionStorage.getItem('_mydeal_')}` } });
    const getDataDownload = (endPoint, parameters) => api.get(endPoint, parameters, { responseType: 'blob', withCredentials : false, headers: { 'Authorization': `Bearer ${window.sessionStorage.getItem('_mydeal_')}` } });
    const getDataCreds = (endPoint, parameters) => api.get(endPoint, parameters, { withCredentials:true });
    const postData = (endPoint, parameters) => api.post(endPoint, parameters, { withCredentials : false, headers: { 'Authorization': `Bearer ${window.sessionStorage.getItem('_mydeal_')}` } });
    const putData = (endPoint, parameters) => api.put(endPoint, parameters, { withCredentials : false, headers: { 'Authorization': `Bearer ${window.sessionStorage.getItem('_mydeal_')}` } });
    const deleteData = (endPoint, parameters) => api.delete(endPoint, parameters, { withCredentials : false, headers: { 'Authorization': `Bearer ${window.sessionStorage.getItem('_mydeal_')}` } });
    return {
        // a list of the API functions from step 2
        api,
        getData,
        getDataDownload,
        getDataCreds,
        postData,
        putData,
        deleteData
    }
}

// let's return back our create method as the default.
export default {
    create
}
