import axios from "axios";

<<<<<<< HEAD
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
=======
// export const getall = async () =>
// await axios.get(`${process.env.REACT_APP_API}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
  
  export const createContract = async (token, contractData) => {
    // console.log(data);
  
    await axios.post(`${process.env.REACT_APP_API}contract`, contractData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const deactivateContract = async (token,id) =>
  await axios.delete(
    `${process.env.REACT_APP_API}contract/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const filterContract = async (token) =>
  await axios.get(
    `${process.env.REACT_APP_API}contract`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateContract = async (token, updateData, id) =>
  await axios.patch(
    `${process.env.REACT_APP_API}contract/${id}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
>>>>>>> Thong
  );
