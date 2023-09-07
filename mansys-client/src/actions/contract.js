import { ContractService } from "../services/contract-service";
import { showErrorMessage } from "../commons/utilities"

export const createContract = (navigate, contractData) => async (dispatch) => {
    const result = await ContractService.create(contractData);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while creating the contract!')
        return;
    }
    navigate("/contracts");
};

export const updateContract = (navigate, contractData) => async (dispatch) => {
    const result = await ContractService.update(contractData);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while updating the contract!')
        return;
    }
    navigate(`/edit_contract/${contractData.id}`);
};