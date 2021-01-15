import actionTypes from "../actions/actionTypes";
const isLogin = Boolean(
  window.localStorage.getItem("authToken") ||
    window.sessionStorage.getItem("authToken")
);
const userInfo=JSON.parse(window.localStorage.getItem("userInfo"))||JSON.parse(window.sessionStorage.getItem("userInfo"))
const initState = {
  ...userInfo,
  isLogin,
  isLoading: false,
};
const action = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGIN_SUCCSSED:
      console.log({ ...state, ...action.payLoad.userInfo });
      return {
        ...state,
        ...action.payLoad.userInfo,
        isLoading: false,
        isLogin: true,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        id:"",
        displayName:"",
        avatarL:"",
        isLogin:false,
        isLoading:false,
        role:null
      };
    default:
      return state;
  }
};
export default action;
