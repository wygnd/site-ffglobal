import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AxiosError} from "axios";
import globalRouter from "@/utils/global-router";

const $api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

const $apiAuth = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

$apiAuth.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const {headers} = config;

  const token = localStorage.getItem('jwtToken');

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return config;
})

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response.status === 401 && error.config) {
    const originalRequest = error.config;
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/auth/refresh`, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
      // localStorage.setItem('jwtToken', response.data.access_token);
      // userStore.getState().setAuth(true)
      return Promise.reject($apiAuth.request(originalRequest));
    } catch (e) {
      console.log(e);
      console.log('Пользователь не авторизован 3');
      globalRouter.navigate("/auth");
    }
  }
  throw error;

};

$apiAuth.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  return config;
}, onResponseError)

export {
  $api, $apiAuth
}