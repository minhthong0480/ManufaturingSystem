import axios from "axios";
import { useDispatch } from "react-redux";
import { navigate } from "react-router-dom";


// export const loggedInUser = (user, token) => ({
//   type: 'LOGGED_IN_USER',
//   payload: { user, token },
// });

// export const signIn =  (dataForm )  => async (dispatch) => {
//   const { data } = await axios.post(
//     `${process.env.REACT_APP_API}auth/login`,
//     dataForm
//   );
//   localStorage.setItem("token", data.accessToken);
//   localStorage.setItem("username", data.username);
//   return data;
  

//   // Make a POST request to the login endpoint
//   const response = await axios.post(
//     `${process.env.REACT_APP_API}auth/login`,
//     dataForm
//   );

//   console.log("SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> ");

//   // Save user token to local storage
//   localStorage.setItem("token", response.accessToken);

//   // // Dispatch an action to update the Redux store with user data
//   dispatch({
//     type: "LOGGED_IN_USER",
//     payload: response.data,
//   });
//   // navigate("/");
// };

export const signIn = (userdata, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/auth/login`,
      userdata
    );

    console.log("SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> ");
    //save user to local storage
    localStorage.setItem("auth", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.access_token);
    //save to redux
    dispatch({
      type: "LOGGED_IN_USER",
      payload: res.data,
    });
    navigate("/");
  } catch (e) {
    // if (e.response.status === 400) {
    //   toast.error(e.response.data);
    // }
    console.error(e)
  }
};
