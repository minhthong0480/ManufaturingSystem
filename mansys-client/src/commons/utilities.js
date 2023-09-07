import {SUCCESS_CODE, SUCCESS_MSG, FAIL_CODE, FAIL_MSG} from './enum'
import { notification } from 'antd';

export const requestSucess = function(data, message){
    return {
        status: SUCCESS_CODE,
        code : SUCCESS_CODE,
        message : !message ? SUCCESS_MSG : message,
        data : data
    }
}

export const requestFail = function(message){
    return {
        status: FAIL_CODE,
        code : FAIL_CODE,
        message : !message ? FAIL_MSG : message
    }
}

export const showErrorMessage = function(message){
    notification.open({
        message: 'Error notification',
        description: message || 'There is an unknown error happend, please try again!',
        duration: 5,
        placement: 'bottomRight',
        type : 'error'
      });
}
