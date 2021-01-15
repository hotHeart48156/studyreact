import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { adminRouter } from "./router";
import { Frame } from "./components";
import { connect } from "react-redux";
const meuns = adminRouter.filter((item) => {
  return item.isNav ? item : null;
});
const mapState = (state) => (
  {
    isLogin: state.user.isLogin,
    role: state.user.roles,
  }
);
@connect(mapState)
class App extends Component {
  render() {
    return this.props.isLogin ? (
      <>
        <Frame meuns={meuns}>
          <Switch>
            {/* <Route key="34345435" path="/admin/notification" component={()=>{return <Notification />}} ></Route> */}

            {adminRouter.map((route) => {
              return (
                <Route
                  key={route.pathname}
                  path={route.pathname}
                  exact={route.exact}
                  render={(routeProps) => {
                    const hadPression = route.roles.includes(this.props.role);
                    console.log(hadPression);
                    console.log(typeof this.props.role);
                    console.log(route.roles);
                    return hadPression ? (
                      <route.component {...routeProps} />
                    ) : (
                      <Redirect to="/admin/noauth" />
                    );
                  }}
                ></Route>
              );
            })}
            <Redirect to="/admin/dashborder" from=" /admin" exact />
          </Switch>
        </Frame>
      </>
    ) : (
      <Redirect to="/login"></Redirect>
    );
  }
}
export { App };
