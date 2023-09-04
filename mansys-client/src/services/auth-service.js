import {AxiosClient} from '../commons/axios-client'
import {API_LOGIN_URL, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const AuthService = {
    login : async function(username, password){

        const result = await AxiosClient.post(API_LOGIN_URL, {username, password})
        if(result.status >= 400 || !result.data.isSuccess) return requestFail()
        
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify({username: result.data.username, id: result.data.userId}));
        localStorage.setItem(LOCAL_STORAGE_TOKEN, result.data.accessToken);
        
        return requestSucess({
            userId : result.data.userId,
            username : result.data.username,
            token : result.data.accessToken
        })
    },

    logout: async function(){
        localStorage.removeItem(LOCAL_STORAGE_USER);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        return requestSucess();
    }
}
