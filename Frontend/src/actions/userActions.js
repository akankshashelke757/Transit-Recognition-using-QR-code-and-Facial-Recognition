import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  // USER_UPDATE_FAILED,
  // USER_UPDATE_REQUEST,
  // USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

const url = "http://127.0.0.1:8000";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    // To make api request that takes json data
    // we need to provide some header
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${url}/user/login/`,
      {
        email: email,
        password: password,
      },
      config
    );
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // localstorage can't store the object data
    // so we need to convert it into string data
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginWithAadhaar =
  (adhaar_no, otp_verification, otp) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      // To make api request that takes json data
      // we need to provide some header
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${url}/user/login`,
        {
          uid: adhaar_no,
          otp_verification: otp_verification,
          otp: otp,
        },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      // localstorage can't store the object data
      // so we need to convert it into string data
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const { data } = await axios.get(`${url}/user/logout/`);
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register =
  (name, email, password, mobile, dob, gender, uid, pic) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${url}/user/signup/`,
        {
          name: name,
          email: email,
          password: password,
          mobile: mobile,
          dob: dob,
          gender: gender,
          uid: uid,
          pic: pic,
        },
        config
      );
      console.log(data);

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const updateProfile = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_UPDATE_REQUEST,
//     });
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     let req_param;
//     // console.log(user);
//     // if (user.password === "") {
//     // } else {
//     //   req_param = user;
//     // }
//     req_param = {
//       name: user.name,
//       dob: user.dob,
//       email: user.email,
//       // password: user.password,
//     };

//     const { data } = await axios.patch(`${url}/user/me`, req_param, config);
//     const userData = { user: data, token: userInfo.token };

//     dispatch({
//       type: USER_UPDATE_SUCCESS,
//       payload: userData,
//     });

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: userData,
//     });

//     localStorage.setItem("userInfo", JSON.stringify(userData));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;

//     dispatch({
//       type: USER_UPDATE_FAILED,
//       payload: message,
//     });
//   }
// };
