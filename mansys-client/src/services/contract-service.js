import create from '@ant-design/icons/lib/components/IconFont'
import {AxiosClient} from '../commons/axios-client'
import {API_CONTRACT_FILTER, API_CONTRACT_DELETE, API_CONTRACT_CREATE} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const ContractService = {
    getAll : async function(page, pageSize, term) {
        const filterResult = await AxiosClient.get(API_CONTRACT_FILTER, {params : {page, pageSize, term}} )
        if(!filterResult || filterResult.status !== 200 || !filterResult.data.isSuccess) return requestFail()
        return requestSucess({
            data: filterResult.data.data,
            totalRows : filterResult.data.totalRows
        })
    },
    
    delete : async function(id) {
        const deleteResult = await AxiosClient.delete(API_CONTRACT_DELETE + id)
        if(!deleteResult || deleteResult.status !== 200 || !deleteResult.data.isSuccess) {
            console.log("deleteResult", deleteResult)
            return requestFail()
        }
        console.log("deleteResult", deleteResult)
        return requestSucess(deleteResult.data.data)
    },

    create : async function(payload) {
        console.log('create() called')
        const createResult = await AxiosClient.post(API_CONTRACT_CREATE, payload)
        if(!createResult || createResult.status !== 200 || !createResult.data.isSuccess) {
            console.log('create() failed')
            return requestFail()
        }
        console.log('create() success')
        return requestSucess(createResult.data.data)
    }
}
