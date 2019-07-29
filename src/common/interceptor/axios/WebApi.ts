import axios from 'axios'
import BaseService from "@/common/interceptor/BaseService";

const webApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
});

webApi.interceptors.request.use( (config) => {

  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // webApi.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

// webApi.defaults.headers.common['Accept-Customer'] = process.env.VUE_APP_CUSTOMER_ID

// webApi.setToken = (token) => {
//   webApi.defaults.headers.common['Authorization'] = token
// }
//
// webApi.setCustomer = (secret) => {
//   webApi.defaults.headers.common['Accept-Customer'] = secret
// }
//
// webApi.setAcceptLanguage = (lang) => {
//   webApi.defaults.headers.common['Accept-Language'] = lang
// }

/**
webApi.interceptors.request.use(function (config) {
  // hook
  if (!navigator.onLine)
    return Promise.reject({message: 'You are offline'})

  return config
}, function (error) {
  // hook

  return Promise.reject(error)
})

// Add a response interceptor
webApi.interceptors.response.use(function (response) {
  // hook

  return response
}, function (error) {
  // hook
  if (error.response)
    if (error.response.data && error.response.message)
      error.message = error.response.message
    else if (error.response.data && typeof error.response.data === 'string')
      error.message = error.response.data

  return Promise.reject(error)
});

const setToken = (token: any) => {
  webApi.defaults.headers.common['Authorization'] = token;
};

const token = localStorage.getItem('web_token');
console.log(token);
setToken(token);
 **/

export default webApi;
