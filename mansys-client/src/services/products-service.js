import { AxiosClient } from '../commons/axios-client'
import { API_PRODUCTS, API_PRODUCTS_CREATE } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const ProductsService = {
    getAll: async function () {
        const filterResult = await AxiosClient.get(API_PRODUCTS, {})
        if (!filterResult) return requestFail();
        return filterResult;
    },
    createProducts: async function (payload) {
        const filterResult = await AxiosClient.post(API_PRODUCTS_CREATE, payload)
        return filterResult
    }
}   