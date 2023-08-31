import {LOCAL_STORAGE_USER, ACTION_AUTH_LOGIN_SUCCESS, ACTION_AUTH_LOGOUT} from '../commons/enum'

 let currentUserInformation = {
    username : null,
    token : null
 }

if(window.localStorage.getItem(LOCAL_STORAGE_USER)){
  currentUserInformation = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_USER));
}else {
  currentUserInformation = null;
} 

export const authReducer = (state = currentUserInformation, action) => {
  switch (action.type) {
    case ACTION_AUTH_LOGIN_SUCCESS:
      return { 
        ...state,
        ...action.payload
      };
    case ACTION_AUTH_LOGOUT:
      return action.payload;
    default:
      return state;
  }
};