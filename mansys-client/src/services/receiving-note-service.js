import { AxiosClient } from '../commons/axios-client'
import { API_RECEIVING_NOTE_FILTER, API_RECEIVING_NOTE, API_RECEIVING_NOTE_APPROVE } from '../commons/enum'
import { requestSucess, requestFail } from '../commons/utilities'

export const ReceivingNoteService = {

  filter: async function (page, pageSize, term) {
    let result;
    if (term) {
      result = await AxiosClient.get(API_RECEIVING_NOTE_FILTER, { params: { page, pageSize } })
    }
    else
      result = await AxiosClient.get(API_RECEIVING_NOTE_FILTER, { params: { page, pageSize } })

    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data,
      totalRows: result.data.totalRows
    })
  },

  delete: async function (data) {
    const api = API_RECEIVING_NOTE + data.id;
    const result = await AxiosClient.delete(api)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },

  update: async function (data) {
    const api = API_RECEIVING_NOTE + data.id;
    const result = await AxiosClient.patch(api, data)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },

  create: async function (data) {
    const result = await AxiosClient.post(API_RECEIVING_NOTE, data)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },

  get: async function (id) {
    const api = API_RECEIVING_NOTE + id;
    const result = await AxiosClient.get(api)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },

  approve: async function (id) {
    const api = API_RECEIVING_NOTE_APPROVE + id;
    const result = await AxiosClient.get(api)
    if (result.status >= 400 || !result.data.isSuccess) return requestFail(result.message)
    return requestSucess({
      data: result.data.data
    })
  },
}