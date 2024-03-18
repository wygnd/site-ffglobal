import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AxiosError} from "axios";

const $api = axios.create({
  baseURL: 'https://ffglobal.ru/api',
  withCredentials: true
})

const $apiAuth = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true
})

$apiAuth.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const {headers} = config;

  headers.authorization = `Bearer ${localStorage.getItem('apiToken')}`;

  return config;
})

const onResponseError = (error: AxiosError): Promise<AxiosError> => {

  // const originalRequest = error.config;
  // if(error.response.status === 401 && error.config) {
  //
  // }

  return Promise.reject(error);
}

$apiAuth.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  return config;
}, onResponseError)

export {
  $api, $apiAuth
}