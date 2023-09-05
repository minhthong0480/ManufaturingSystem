import {AxiosClient} from '../commons/axios-client'
import {API_CONTRACT_FILTER, API_CONTRACT_CREATE, API_CONTRACT_DELETE} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const ContractService = {
    filter : async function(page, pageSize, term, isActive) {
        const result = await AxiosClient.get(API_CONTRACT_FILTER, {params : {page, pageSize, term, isActive}} )
        if(result.status >= 400 || !result.data.isSuccess) return requestFail()
        return requestSucess({
            data: result.data.data,
            totalRows : result.data.totalRows
        })
    },

    create: async function(data){
        const result = await AxiosClient.post(API_CONTRACT_CREATE, data)
        if(result.status >= 400 || !result.data.isSuccess) return requestFail()
        return requestSucess({
           data : result.data.data
        })
    },

    delete: async function(data) {
        const api = API_CONTRACT_DELETE + data.id;
        const result = await AxiosClient.delete(api)
        if(result.status >= 400 || !result.data.isSuccess) return requestFail()
        return requestSucess({
           data : result.data.data
        })
    }
}
