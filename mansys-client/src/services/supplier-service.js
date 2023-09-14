import { AxiosClient } from '../commons/axios-client'
import {API_SUPPLIER } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const SupplierService = {

	getAll: async function () {
		const result = await AxiosClient.get(API_SUPPLIER);
		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data
		})
	},

}