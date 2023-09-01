
// use for defining api url
export const BASE_API_URL = process.env.REACT_APP_API;
export const API_LOGIN_URL = `${BASE_API_URL}/auth/login` 
export const API_USER_INFOR_URL = `${BASE_API_URL}/user`


export const API_CONTRACT_FILTER = `${BASE_API_URL}/contract/filterContracts`
export const API_PRODUCTS = `${BASE_API_URL}/products`



// use for accessing local storage variables
export const LOCAL_STORAGE_TOKEN = 'AUTH_TOKEN';
export const LOCAL_STORAGE_USER = 'AUTH_USER';


// use for redux action types
export const ACTION_AUTH_LOGIN_SUCCESS = 'LOGGED_IN_USER';
export const ACTION_AUTH_LOGOUT = 'LOGOUT';
export const ACTION_PRODUCTS_SUCCESS= 'PRODUCTS';


// use for http request

export const SUCCESS_CODE = 200;
export const SUCCESS_MSG = 'Request sucess!';

export const FAIL_CODE = 400;
export const FAIL_MSG = 'Request fail!';

