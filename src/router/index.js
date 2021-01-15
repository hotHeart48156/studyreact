import {
  Artical,
  DashBorder,
  Setting,
  Login,
  NotFound,
  ArticalEdit,
  NoAuth,
} from "../views";
import Notification from "../views/Notification";

export const mainRouter = [
  {
    pathname: "/login",
    component: Login,
  },
  
  {
    pathname: "/404",
    component: NotFound,
  },
];

export const adminRouter = [
  {
    pathname: "/admin/dashborder",
    component: DashBorder,
    title: "仪表盘",
    isNav: true,
    roles: ["001", "002", "003"],
  },
  {
    pathname: "/admin/noauth",
    component: NoAuth,
    roles: ["001", "002", "003"],

  },
  {
    pathname: "/admin/artical/edit",
    component: ArticalEdit,
    title: "文章编辑",
    isNav: false,
    roles: ["001","002"],
  },
  {
    pathname: "/admin/notification",
    component: Notification,
    title: "消息",
    isNav: false,
    roles: ["001"],

  },

  {
    pathname: "/admin/setting",
    component: Setting,
    title: "设置",
    isNav: true,
    roles: ["001"],
  },
  {
    pathname: "/admin/artical",
    component: Artical,
    exact: true,
    title: "文章",
    isNav: true,
    roles: ["001"],
  },
];
