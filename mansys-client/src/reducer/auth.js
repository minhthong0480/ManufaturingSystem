let userState;

if(window.localStorage.getItem('auth')){
  userState = JSON.parse(window.localStorage.getItem('auth'));
}else {
  userState = null;
} 


export const authReducer = (
  state = userState,
  action
) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { 
        // loading: false,
        // error: "",
        // auth: action.payload
        ...state,
        ...action.payload
      };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};