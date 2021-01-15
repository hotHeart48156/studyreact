import { Button, Card, List, Avatar, Badge } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  markNotificationRead,
  markNotificationAllRead,
} from "../../actions/notification";
const mapState = (state) => {
  const { list } = state.notification;
  return {
    list,
  };
  // console.log(state.notification);
  // return state.notification
};

@connect(mapState, { markNotificationRead, markNotificationAllRead })
class Notification extends Component {
  render() {
    return (
      <>
        <Card
          extra={
            <Button onClick={this.props.markNotificationAllRead.bind(this)}>
              全部标记为已读
            </Button>
          }
          title="通知中心"
        ></Card>
        <List
          itemLayout="horizontal"
          dataSource={this.props.list}
          //item 的箭头函数必须接小括号（）
          renderItem={(item) => (
            <List.Item
              extra={
                <Button
                  onClick={
                    item.hasread
                      ? null
                      : this.props.markNotificationRead.bind(this, item.id)
                  }
                >
                  标记为已读
                </Button>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  item.hasread ? (
                    <Badge>{item.title}</Badge>
                  ) : (
                    <Badge dot> {item.title}</Badge>
                  )
                }
                description={item.desc}
              />
            </List.Item>
          )}
        />
        ,
      </>
    );
  }
}
export default Notification;
