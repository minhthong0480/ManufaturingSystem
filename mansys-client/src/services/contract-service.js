import { AxiosClient } from '../commons/axios-client'
import { API_CONTRACT, API_CONTRACT_FILTER, API_CONTRACT_CREATE, API_CONTRACT_STATUS, API_CONTRACT_VALIDATE_STATUS } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const ContractService = {

	get: async function (id) {
		const api = API_CONTRACT + id;
		const result = await AxiosClient.get(api);
		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data
		})
	},

	filter: async function (page, pageSize, term, isActive) {
		let result;
		if (term) {
			const contractNumber = term;

			result = await AxiosClient.get(API_CONTRACT_FILTER, { params: { page, pageSize, isActive, contractNumber} })
		}
		else
			result = await AxiosClient.get(API_CONTRACT_FILTER, { params: { page, pageSize, isActive } })

		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data,
			totalRows: result.data.totalRows
		})
	},

	create: async function (data) {
		const result = await AxiosClient.post(API_CONTRACT_CREATE, data)
		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data
		})
	},

	delete: async function (data) {
		const api = API_CONTRACT + data.id;
		const result = await AxiosClient.delete(api)
		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data
		})
	},

	update: async function (data) {
		const api = API_CONTRACT + data.id;
		const result = await AxiosClient.patch(api, data)
		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data
		})
	},

	getStatus : async function(){
		const result = await AxiosClient.get(API_CONTRACT_STATUS);
		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data
		})
	},

	validate : async function(id){
		const result = await AxiosClient.post(API_CONTRACT_VALIDATE_STATUS, {id : id});
		if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
		return requestSucess({
			data: result.data.data
		})
	}


}
