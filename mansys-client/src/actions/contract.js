import axios from "axios";
import "../styles/Contract.css";
import { ContractService } from "../services/contract-service";

export const createContract = (navigate, contractData) => async (dispatch) => {
    const result = await ContractService.create(contractData);
    if (result.code > 400) {
        window.alert("Create Contract Error");
        return;
    }
    navigate("/contracts");
};

export const deactivateContract = async (record) => {
    const result = await ContractService.delete(record);
    if (result.code > 400) {
        window.alert("Delete Contract Error");
        return;
    }
};


export const updateContract = (navigate, contractData) => async (dispatch) => {
    const result = await ContractService.update(contractData);
    if (result.code > 400) {
        window.alert("Create Contract Error");
        return;
    }
    navigate("/contracts");
};