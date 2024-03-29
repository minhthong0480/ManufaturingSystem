
// use for defining api url
export const BASE_API_URL = process.env.REACT_APP_API;
export const API_LOGIN_URL = `${BASE_API_URL}/auth/login`
export const API_USER_INFOR_URL = `${BASE_API_URL}/user`
export const API_CUSTOMER_GET_ALL = `${BASE_API_URL}/customers/getAll`


export const API_CONTRACT = `${BASE_API_URL}/contract/`
export const API_CONTRACT_FILTER = `${BASE_API_URL}/contract/r/filter/`
export const API_CONTRACT_CREATE = `${BASE_API_URL}/contract`
export const API_CONTRACT_DELETE = ``
export const API_CONTRACT_STATUS = `${BASE_API_URL}/contract_status`
export const API_CONTRACT_VALIDATE_STATUS = `${BASE_API_URL}/contract/validate`

export const API_PRODUCTS = `${BASE_API_URL}/products`
export const API_PRODUCTS_CREATE = `${BASE_API_URL}/products/create`

export const API_CATEGORY_GETALL = `${BASE_API_URL}/category`

export const API_SUPPLIER = `${BASE_API_URL}/suppliers`

export const API_BILL_PRODUCT = `${BASE_API_URL}/bills/product`

export const API_INVENTORY = `${BASE_API_URL}/inventory/`
export const API_INVENTORY_FILTER = `${BASE_API_URL}/inventory/filter`

export const API_DELIVERY_NOTE = `${BASE_API_URL}/delivery-notes/`
export const API_DELIVERY_NOTE_FILTER = `${BASE_API_URL}/delivery-notes/filter`
export const API_DELIVERY_NOTE_APPROVE = `${BASE_API_URL}/delivery-notes/approve/`

export const API_RECEIVING_NOTE = `${BASE_API_URL}/receiving-notes/`
export const API_RECEIVING_NOTE_FILTER = `${BASE_API_URL}/receiving-notes/filter`
export const API_RECEIVING_NOTE_APPROVE = `${BASE_API_URL}/receiving-notes/approve/`

export const API_MATERIAL_GETALL = `${BASE_API_URL}/materials`
export const API_MATERIAL_DELETE = `${BASE_API_URL}/materials/:id`
export const API_MATERIAL_UPDATE = `${BASE_API_URL}/materials/:id`
export const API_MATERIAL_CREATE = `${BASE_API_URL}/materials/create`

// use for accessing local storage variables
export const LOCAL_STORAGE_TOKEN = 'AUTH_TOKEN';
export const LOCAL_STORAGE_USER = 'AUTH_USER';


// use for redux action types
export const ACTION_AUTH_LOGIN_SUCCESS = 'LOGGED_IN_USER';
export const ACTION_AUTH_LOGOUT = 'LOGOUT';
export const ACTION_PRODUCTS_SUCCESS = 'PRODUCTS';

export const USER_ROLE_ADMIN = 'admin';

// use for http request

export const SUCCESS_CODE = 200;
export const SUCCESS_MSG = 'Request sucess!';

export const FAIL_CODE = 400;
export const FAIL_MSG = 'Request fail!';

