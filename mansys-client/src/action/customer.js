import axios from "axios";

export const getAllCustomer = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createCustomer = async (customerData, token) =>
  await axios.post(`${process.env.REACT_APP_API}customers`, customerData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const saveCustomer = async (id, customerData, token) =>
  await axios.patch(
    `${process.env.REACT_APP_API}customers/${id}`,
    customerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const deleteCustomer = async (id, token) =>
  await axios.delete(`${process.env.REACT_APP_API}customers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
