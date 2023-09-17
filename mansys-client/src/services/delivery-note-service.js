import { AxiosClient } from '../commons/axios-client'
import { API_DELIVERY_NOTE_FILTER, API_INVENTORY } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const DeliveryNoteService = {

  filter: async function (page, pageSize, term) {
    let result;
    if (term) {
      result = await AxiosClient.get(API_DELIVERY_NOTE_FILTER, { params: { page, pageSize } })
    }
    else
      result = await AxiosClient.get(API_DELIVERY_NOTE_FILTER, { params: { page, pageSize } })

    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data,
      totalRows: result.data.totalRows
    })
  },

  delete: async function (data) {
    const api = API_DELIVERY_NOTE_FILTER + data.id;
    const result = await AxiosClient.delete(api)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },
}