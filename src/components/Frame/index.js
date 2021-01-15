import React, { Component } from "react";
import { Dropdown, Layout, Menu, Icon, Badge } from "antd";
import { withRouter } from "react-router-dom";
import "./frame.less";
import { connect } from "react-redux";
import { getNotiFication } from "../../actions/notification";
import { logout } from "../../actions/user";
import Avatar from "antd/lib/avatar/avatar";
const { Header, Content, Sider } = Layout;
const mapState = (state) => ({
  // notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).lengh,
  avater: state.user.avater,
  displayName: state.user.displayName,
});
@withRouter
@connect(mapState, { getNotiFication, logout })
class Frame extends Component {
  meunClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key);
  };
  DropDownMeunClick = (key) => {
    if (key.key === "/logout") {
      this.props.logout();
    } else {
      this.props.history.push(key.key);
    }
  };
  meun = (
    <Menu onClick={this.DropDownMeunClick}>
      {/* <Badge dot> */}
      <Menu.Item key="/admin/notification">通知中心</Menu.Item>
      {/* </Badge> */}
      <Menu.Item key="/admin/setting">个人设置</Menu.Item>
      <Menu.Item key="/logout" onClick={this.props.logout}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  render() {
    console.log(this.props);
    return (
      <div>
        <Layout>
          <Header className="header">
            {/* <div className="logo" /> */}
            <div style={{ flex: 1 }}>
              <Dropdown overlay={this.meun} trigger={["click"]}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={this.props.avater}></Avatar>
                  <span>{this.props.displayName}</span>
                  <Badge count={10} offset={[-10, -10]}>
                    <Icon type="down" />
                  </Badge>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%" }}
                  onClick={this.meunClick}
                >
                  {this.props.meuns.map((meun) => {
                    return (
                      <Menu.Item key={meun.pathname}>{meun.title}</Menu.Item>
                    );
                  })}
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                {React.Children.toArray(this.props.children)}
              </Content>
            </Layout>
          </Content>
        </Layout>
        ,
      </div>
    );
  }
}
export default Frame;
