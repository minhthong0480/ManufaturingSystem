import {AxiosClient} from '../commons/axios-client'
import {API_CONTRACT_FILTER} from '../commons/enum'
import {requestSucess, requestFail} from '../commons/utilities'

export const ContractService = {
    filter : async function(page, pageSize, term) {
        const filterResult = await AxiosClient.get(API_CONTRACT_FILTER, {params : {page, pageSize, term}} )
        if(!filterResult || filterResult.status !== 200 || !filterResult.data.isSuccess) return requestFail()
        return requestSucess({
            data: filterResult.data.data,
            totalRows : filterResult.data.totalRows
        })
    },
    getContractDetails: async function (contractId) {
        try {
          const response = await AxiosClient.get(`/api/contracts/${contractId}`);
          console.log("Response from API:", response);

          if (response.status === 200 && response.data.isSuccess) {
            return requestSucess(response.data);
          }
          return requestFail(response.data.message);
        } catch (error) {
          return requestFail(error.message);
        }
      },
      
}
