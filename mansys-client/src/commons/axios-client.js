import axios from 'axios';
import {LOCAL_STORAGE_TOKEN} from './enum'

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
