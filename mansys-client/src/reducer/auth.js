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
      console.log(action.payload);
      return { 
        // loading: false,
        // error: "",
        // auth: action.payload
        ...state,
        ...action.payload
        // ...state,
        // user: action.payload.user,
        // token: action.payload.token,
      };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};