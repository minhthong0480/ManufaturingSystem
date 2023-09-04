import {LOCAL_STORAGE_USER, ACTION_AUTH_LOGIN_SUCCESS, ACTION_AUTH_LOGOUT} from '../commons/enum'

 let initUserInformation = {
    userId: null,
    username : null,
    token : null
 }

if(window.localStorage.getItem(LOCAL_STORAGE_USER)){
  initUserInformation = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_USER));
}

export const authReducer = (state = initUserInformation, action) => {
  switch (action.type) {
    case ACTION_AUTH_LOGIN_SUCCESS:
      return { 
        ...state,
        ...action.payload
      };
    case ACTION_AUTH_LOGOUT:
      return {
        ...state,
        ...initUserInformation
      };
    default:
      return state;
  }
};