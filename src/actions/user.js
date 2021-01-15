import actionTypes from "./actionTypes";
import {
  LoginRequest
} from "../request";
const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN,
  };
};
const loginSuccess = (logininfo) => {
  return {
    type: actionTypes.LOGIN_SUCCSSED,
    payLoad: {
      userInfo: logininfo,
      isLogin: true,
    },
  };
};
const loginFail = () => {
  window.sessionStorage.removeItem("authToken");
  window.localStorage.removeItem("authToken");
  window.sessionStorage.removeItem("userInfo");
  window.localStorage.removeItem("userInfo");

  return {
    type: actionTypes.LOGIN_FAIL,
  };
};
const login = (userInfo) => {
  return (dispatch) => {
    dispatch(startLogin());
    LoginRequest(userInfo).then((resp) => {
      if (resp.data.code === 200) {
        const {authToken,...userInfo}=resp.data.data
        if (userInfo.remember === true) {
          console.log(resp.data.data);
          window.localStorage.setItem("authToken", resp.data.data.token);
          window.localStorage.setItem("userInfo",JSON.stringify(resp.data.data))
        } else {
          window.sessionStorage.setItem("authToken", resp.data.data.token);
          window.sessionStorage.setItem("userInfo",JSON.stringify(resp.data.data))
        }
        dispatch(loginSuccess({...resp.data.data,remember:userInfo.remember}));
      } else {
        dispatch(loginFail());
      }
    });
  };
};

 const logout=()=>{
  return dispatch=>{
    dispatch(loginFail())
  }
}
export {
  loginFail,
  loginSuccess,
  startLogin,
  login,
  logout
};