import actionTypes from "./actionTypes";
export const markNotificationRead = (id) => {
  console.log(id);
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AD_READ,
        payLaod: {
          id,
        },
      });
    }, 200);
  };
};
export const markNotificationAllRead = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_All_READ,
      });
    }, 200);
  };
};
export const getNotiFication=()=>{
  return(dispatch)=>{
    dispatch({
      type:actionTypes.MARK_NOTIFICATION_AD_READ
    })
  }
}