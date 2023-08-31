import {AxiosClient} from '../commons/axios-client'
import {API_LOGIN_URL, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const AuthService = {
    login : async function(username, password){

        const loginResult = await AxiosClient.post(API_LOGIN_URL, {username, password})
        if(!loginResult) return requestFail()
        
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify({username: loginResult.data.username}));
        localStorage.setItem(LOCAL_STORAGE_TOKEN, loginResult.data.accessToken);
        
        return requestSucess({
            username : loginResult.data.username,
            token : loginResult.data.accessToken
        })
    }
}
