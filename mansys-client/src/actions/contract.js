import axios from "axios";
import { ContractService } from '../services/contract-service'

//create a createContract function
export const createContract = (payload) => async () => {
  const result = await ContractService.create(payload);
  const { onSuccess = () => { } } = payload;
  if (result.status !== 200) {
    console.log('Failed to create contract');
    console.log(result.data);
    return onSuccess(result.data);
  }
  console.log('Successfully created contract');
  console.log(result.data);
  return onSuccess(result.data);
}

// export const deactivateContract = async (token,id) =>
//   await axios.delete(
//     `${process.env.REACT_APP_API}/contract/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//create deactivateContract function
export const deactivateContract = async (id) => {
  const deleteResult = await ContractService.delete(id)
  console.log("deleteResult: ", deleteResult)
  if(deleteResult.code != 200) return
  return deleteResult
}

