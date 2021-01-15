import { render } from "react-dom";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { mainRouter } from "./router";
import { App } from "./App";
import LocaleProvider from "antd/lib/locale-provider";
import zhCN from "antd/lib/locale-provider/zh_CN";
import store from "./store";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={(rendeProps) => {
              return <App {...rendeProps} />;
            }}
          ></Route>
          {mainRouter.map((route) => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                component={() => {
                  return <route.component />;
                }}
                exact={route.exact}
              />
            );
          })}
          <Redirect to="404" />
        </Switch>
      </Router>
    </LocaleProvider>
  </Provider>,
  document.querySelector("#root")
);
