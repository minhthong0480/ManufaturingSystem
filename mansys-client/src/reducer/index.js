import { combineReducers } from "redux"
import {authReducer} from './auth'
//combine multiple reducer
const rootReducer = combineReducers({
    auth: authReducer,
  })

  export default rootReducer