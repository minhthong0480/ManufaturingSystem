import { AuthService } from '../services/auth-service';
import {ACTION_AUTH_LOGIN_SUCCESS, ACTION_AUTH_LOGOUT} from '../commons/enum'

export const signIn = (userdata, navigate) => async (dispatch) => {

    const loginResult = await AuthService.login(userdata.username, userdata.password)
    if(loginResult.code >= 400) {
      window.alert(loginResult.message)
      return
    }

    dispatch({
      type: ACTION_AUTH_LOGIN_SUCCESS,
      payload: {
        userId: loginResult.data.userId,
        username: loginResult.data.username,
        token : loginResult.data.token
      }
    });
    navigate("/");
};

export const signOut = (navigate) => async (dispatch) => {

  const logoutResult = await AuthService.logout()
  if(logoutResult.code !== 200) return;
  else {
    dispatch({
      type: ACTION_AUTH_LOGOUT
    });
    window.setTimeout(() => {
      navigate("/login");
    }, 2000)
  }
};