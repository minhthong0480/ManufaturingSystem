import {AxiosClient} from '../commons/axios-client'
import {API_CONTRACT_FILTER} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const ContractService = {
    filter : async function(page, pageSize, term) {
        const filterResult = await AxiosClient.get(API_CONTRACT_FILTER, {params : {page, pageSize, term}} )
        if(!filterResult) return requestFail()
        return requestSucess(filterResult)
    }
}
