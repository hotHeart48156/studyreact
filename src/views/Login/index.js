import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import "./login.less";
import { login } from "../../actions/user";
import { Redirect } from "react-router-dom";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const mapState = (state) => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading,
});
@connect(mapState, { login })
// @Form.create()
class Login extends Component {
  onFinish = (values) => {
    this.props.login(values);
    console.log(this.props);
  };
  render() {
    return this.props.isLogin ? (
      <Redirect to="/admin"></Redirect>
    ) : (
      <>
        {/* <Spin> */}
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={onFinishFailed}
            className="login"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input disabled={this.props.isLoading} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password disabled={this.props.isLoading} />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox disabled={this.props.isLoading}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={this.props.isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        {/* </Spin> */}
      </>
    );
  }
}

export default Login;
