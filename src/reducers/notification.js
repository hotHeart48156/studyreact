import actiontype from "../actions/actionTypes";
const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      title: "民航局再发多个“熔断”指令！111",
      desc:
        "根据民航局通报，法国航空公司11月6日入境的AF198航班(巴黎至上海浦东)核酸检测阳性旅客6人，自11月23日起，暂停该航班运行1周；印度尼西亚苏拉维加亚航空11 月6 日入境的SJ3124航班(雅加达至武汉)核酸检测阳性旅客6人",
      hasread: false,
    },
    {
      id: 2,
      title: "民航局再发多个“熔断”指令！222",
      desc:
        "根据民航局通报，法国航空公司11月6日入境的AF198航班(巴黎至上海浦东)核酸检测阳性旅客6人，自11月23日起，暂停该航班运行1周；印度尼西亚苏拉维加亚航空11 月6 日入境的SJ3124航班(雅加达至武汉)核酸检测阳性旅客6人",
      hasread: false,
    },
  ],
};

const action = (state = initState, action) => {
  // console.log(action.type===actiontype.MARK_NOTIFICATION_AD_READ);
  // console.log(actiontype.MARK_NOTIFICATION_AD_READ);

  switch (action.type) {
    case actiontype.MARK_NOTIFICATION_AD_READ:
      const newList = state.list.map((item) => {
        if (item.id === action.payLaod.id) {
          item.hasread = true;
        }
        return item;
      });
      return {
        state,
        list: newList,
      };
    case actiontype.MARK_NOTIFICATION_All_READ:
      return state.list.reduce((item) => {
        item.hasread = true;

        return item;
      });

    default:
      return state;
  }
};
export default action;
