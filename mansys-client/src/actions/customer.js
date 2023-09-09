import { AxiosClient } from "../commons/axios-client";

export const getAllCustomer = async () => {
  const { data } = await AxiosClient.get(
    `${process.env.REACT_APP_API}/customers/getAll`
  );
  return data;
};

export const createCustomer = async (customerData) =>
  await AxiosClient.post(
    `${process.env.REACT_APP_API}/customers`,
    customerData
  );

export const saveCustomer = async (id, customerData) =>
  await AxiosClient.patch(
    `${process.env.REACT_APP_API}/customers/${id}`,
    customerData
  );

export const deleteCustomer = async (id) => {
  const { data } = await AxiosClient.delete(
    `${process.env.REACT_APP_API}/customers/${id}`
  );
  return data;
};
