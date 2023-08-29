import axios from "axios";

export const getall = async () =>
await axios.get(`${process.env.REACT_APP_API}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  
  export const create = async (data) => {
    // console.log(data);
  
    await axios.post(`${process.env.REACT_APP_API}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
  };

export const deleteOne = async (id) =>
  await axios.delete(
    `${process.env.REACT_APP_API}`,
    {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  );

export const getOne = async (id) =>
  await axios.get(
    `${process.env.REACT_APP_API}`,
    {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  );

export const update = async (token, data, id) =>
  await axios.put(
    `${process.env.REACT_APP_API}`,
    data
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
