import {AxiosClient} from '../commons/axios-client'
import {API_CUSTOMER_GET_ALL} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const CustomerService = {
    getAll : async function(){

        const callResult = await AxiosClient.get(API_CUSTOMER_GET_ALL)
        if(callResult.status != 200 || callResult.data.code != 200) return requestFail()
        return requestSucess(callResult.data.data ? callResult.data.data : [])
    },
}
