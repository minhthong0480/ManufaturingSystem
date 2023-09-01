import axios from "axios";
import {ContractService} from '../services/contract-service'

export const filterContracts = (page, pageSize, term) => async () => {
  const result = await ContractService.filter(page, pageSize, term)
  if(result.code !== 200) return
  return
}

export const createContract = async (token, contractData) => {
    // console.log(data);
  
    await axios.post(`${process.env.REACT_APP_API}/contract`, contractData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const deactivateContract = async (token,id) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/contract/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateContract = async (token, updateData, id) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/contract/${id}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
