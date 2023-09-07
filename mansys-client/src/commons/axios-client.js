import axios from 'axios';
import {LOCAL_STORAGE_TOKEN} from './enum'
import { requestFail } from './utilities'
export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
});

AxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response)
    return Promise.resolve(requestFail('An error is occurred, please try again!'));
  }
);
