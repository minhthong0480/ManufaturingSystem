import { AxiosClient } from '../commons/axios-client'
import { API_MATERIAL_DELETE, API_MATERIAL_GETALL, API_MATERIAL_UPDATE, API_MATERIAL_CREATE } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const MaterialService = {
    getAll: async function (name) {
        const result = await AxiosClient.get(API_MATERIAL_GETALL, {params: {name}})
        if (result.status >= 400 || result.data.code >= 400) return requestFail();
        return requestSucess(result.data.data);
    },

    delete: async function(id){
        const result = await AxiosClient.delete(API_MATERIAL_DELETE.replace(':id', id + ''))
        if (result.status >= 400 || result.data.code >= 400) return requestFail();
        return requestSucess(result.data.message);
    },

    update: async function(id, data){
        const result = await AxiosClient.put(API_MATERIAL_UPDATE.replace(':id', id + ''), data)
        if (result.status >= 400 || result.data.code >= 400) return requestFail();
        return requestSucess(result.data);
    },

    create: async function(data){
        const result = await AxiosClient.post(API_MATERIAL_CREATE, data)
        if (result.status >= 400 || result.data.code >= 400) return requestFail();
        return requestSucess(result.data);
    }
    // createProducts: async function (payload) {
    //     const filterResult = await AxiosClient.post(API_PRODUCTS_CREATE, payload)
    //     return filterResult
    // }
}   