import axios from "axios";
import '../styles/Contract.css';
import { ContractService } from '../services/contract-service'

export const createContract = (navigate, contractData) => async (dispatch) => {
   const result = await ContractService.create(contractData)
   if(result.code > 400){
      window.alert('Create Contract Error');
      return
    }
    navigate('/contracts')
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
