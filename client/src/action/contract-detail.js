import axios from "axios";


export const create = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/contract-detail/`, data, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

export const getall = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/contract-detail/`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

export const deleteOne = async (token, contractId) =>
  await axios.delete(`${process.env.REACT_APP_API}/contract-detail/${contractId}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

export const getOne = async (contractId, token) =>
  await axios.get(`${process.env.REACT_APP_API}/contract-detail/${contractId}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

export const update = async (token, data, contractId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/contract-detail/updateContract/${contractId}`,
    data,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
