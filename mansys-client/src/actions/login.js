import { AuthService } from '../services/auth-service';
import {ACTION_AUTH_LOGIN_SUCCESS} from '../commons/enum'

export const signIn = (userdata, navigate) => async (dispatch) => {

    const loginResult = await AuthService.login(userdata.username, userdata.password)
    if(loginResult.code !== 200) return;
    
    dispatch({
      type: ACTION_AUTH_LOGIN_SUCCESS,
      payload: {
        username: loginResult.data.username,
        token : loginResult.data.token
      }
    });
    navigate("/");
};
