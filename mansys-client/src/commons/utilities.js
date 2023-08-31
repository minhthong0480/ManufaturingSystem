import {SUCCESS_CODE, SUCCESS_MSG, FAIL_CODE, FAIL_MSG} from './enum'

export const requestSucess = function(data, message){
    return {
        code : SUCCESS_CODE,
        message : !message ? SUCCESS_MSG : message,
        data : data
    }
}

export const requestFail = function(message){
    return {
        code : FAIL_CODE,
        message : !message ? FAIL_MSG : message
    }
}
