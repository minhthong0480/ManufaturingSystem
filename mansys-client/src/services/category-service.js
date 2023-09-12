import { AxiosClient } from '../commons/axios-client'
import { requestSucess, requestFail } from '../commons/utilities'
import { API_CATEGORY_GETALL } from '../commons/enum'

export const CategoryService = {
    getAll: async function () {
        const filterResult = await AxiosClient.get(API_CATEGORY_GETALL, {})
        if (!filterResult) return requestFail();
        return filterResult.data;
    },

    
}
