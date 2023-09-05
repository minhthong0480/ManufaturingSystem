
// use for defining api url
export const BASE_API_URL = process.env.REACT_APP_API;
export const API_LOGIN_URL = `${BASE_API_URL}/auth/login` 
export const API_USER_INFOR_URL = `${BASE_API_URL}/user`
export const API_CUSTOMER_GET_ALL = `${BASE_API_URL}/customers/getAll`


export const API_CONTRACT_FILTER = `${BASE_API_URL}/contract/filterContracts`
export const API_PRODUCTS = `${BASE_API_URL}/products`
export const API_PRODUCTS_CREATE = `${BASE_API_URL}/products/create`

//define api for contract
export const API_CONTRACT_CREATE = `${BASE_API_URL}/contract/create`
export const API_CONTRACT_UPDATE = `${BASE_API_URL}/contract/`
export const API_CONTRACT_DELETE = `${BASE_API_URL}/contract/`

export const API_CATEGORY_GETALL = `${BASE_API_URL}/category`

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

