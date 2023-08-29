import axios from "axios";
import { useDispatch } from "react-redux";
import { navigate } from "react-router-dom";


export const loggedInUser = (user, token) => ({
  type: 'LOGGED_IN_USER',
  payload: { user, token },
});

export const signIn = async (dataForm )  => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API}auth/login`,
    dataForm
  );
  localStorage.setItem("token", data.accessToken);
  return data;
  

  // Make a POST request to the login endpoint
  // const response = await axios.post(
  //   `${process.env.REACT_APP_API}auth/login`,
  //   dataForm
  // );

  // console.log("SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> ");

  // // Save user token to local storage
  // localStorage.setItem("token", data.accessToken);

  // // Dispatch an action to update the Redux store with user data
  // dispatch({
  //   type: "LOGGED_IN_USER",
  //   payload: data.data,
  // });
  // navigate("/");
};
