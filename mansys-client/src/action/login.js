import axios from "axios";

export const signIn = async (dataForm) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API}auth/login`,
    dataForm
  );
  localStorage.setItem("token", data.accessToken);
  return data;
};
