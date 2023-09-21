import { AxiosClient } from '../commons/axios-client'
import { API_INVENTORY_FILTER, API_INVENTORY } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const InventoryService = {

  filter: async function (page, pageSize, term, isActive) {
    let result;
    if (term) {
      result = await AxiosClient.get(API_INVENTORY_FILTER, { params: { page, pageSize } })
    }
    else
      result = await AxiosClient.get(API_INVENTORY_FILTER, { params: { page, pageSize } })

    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data,
      totalRows: result.data.totalRows
    })
  },

  delete: async function (data) {
    const api = API_INVENTORY + data.id;
    const result = await AxiosClient.delete(api)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },

  get: async function (id) {
    const api = API_INVENTORY + id;
    const result = await AxiosClient.get(api)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },

  update: async function (data) {
    const api = API_INVENTORY + data.id;
    const result = await AxiosClient.patch(api, data)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },

  create: async function (data) {
    const result = await AxiosClient.post(API_INVENTORY, data)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },
}
