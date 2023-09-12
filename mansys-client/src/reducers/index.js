import { combineReducers } from "redux";
import { authReducer } from './auth';
import { productReducer } from './products';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer
})

export default rootReducer