import { AxiosClient } from '../commons/axios-client'
import { API_PRODUCTS } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const ProductsService = {
    getAll: async function () {
        const filterResult = await AxiosClient.get(API_PRODUCTS, {})
        if (!filterResult) return requestFail();
        console.log(filterResult);
        return filterResult;
    }
}
