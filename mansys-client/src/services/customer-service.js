import {AxiosClient} from '../commons/axios-client'
import {API_CUSTOMER_GET_ALL} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const CustomerService = {
    getAll : async function(){

        const result = await AxiosClient.get(API_CUSTOMER_GET_ALL)
        if(result.status >= 400 || !result.data.isSuccess) return requestFail()
        return requestSucess(result.data.data ? result.data.data : [])
    },
}
