// import Artical from './Artical'
// import ArticalEdit from './Artical/Edit'

// import DashBorder from './DashBorder'
// import Setting from './Setting'
// import Login from './Login'
// import NotFound from './NotFound'
import Loadable from "react-loadable";
import { Loading } from "../components";
const Artical = Loadable({
  loader: () => import("./Artical"),
  loading: Loading,
});
const Setting = Loadable({
  loading: Loading,
  loader: () => import("./Setting"),
});
const DashBorder = Loadable({
  loading: Loading,
  loader: () => import("./DashBorder"),
});
const Login = Loadable({
  loading: Loading,
  loader: () => import("./Login"),
});
const NotFound = Loadable({
  loading: Loading,
  loader: () => import("./NotFound"),
});
const ArticalEdit = Loadable({
  loading: Loading,
  loader: () => import("./Artical/Edit"),
});
const Notification = Loadable({
  loading: Loading,
  loader: () => import("./Notification"),
});
const NoAuth = Loadable({
  loading: Loading,
  loader: () => import("./NoAuth"),
});

export {
  Artical,
  DashBorder,
  Setting,
  Login,
  NotFound,
  ArticalEdit,
  Notification,
  NoAuth,
};
