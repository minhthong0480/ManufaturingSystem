import { AxiosClient } from "../commons/axios-client";

export const getAllUser = async () => {
  const { data } = await AxiosClient.get(`${process.env.REACT_APP_API}/users`);
  return data;
};

export const createUser = async (userData) =>
  await AxiosClient.post(`${process.env.REACT_APP_API}/users`, userData);

export const saveUser = async (id, userData) =>
  await AxiosClient.patch(`${process.env.REACT_APP_API}/users/${id}`, userData);

export const deleteUser = async (id) =>
  await AxiosClient.delete(`${process.env.REACT_APP_API}/users/${id}`);
