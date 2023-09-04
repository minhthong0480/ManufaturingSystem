import {AxiosClient} from '../commons/axios-client'
import {API_CONTRACT_FILTER, API_CONTRACT_CREATE} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const ContractService = {
    filter : async function(page, pageSize, term) {
        const result = await AxiosClient.get(API_CONTRACT_FILTER, {params : {page, pageSize, term}} )
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
    }
}
