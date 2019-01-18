import * as React from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form';
import { FormEvent } from 'react';
import { ApiSignInPayload } from '../../models/ApiSignInPayload';

export interface Props {
  form: WrappedFormUtils;
  onSubmit: (payload: ApiSignInPayload) => void;
}


const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; // Simplified

class _SignIn extends React.Component<Props> {
  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{required: true, pattern: EMAIL_PATTERN, message: 'Please input your username!'}],
          })(
            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username (e-mail)"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                   placeholder="Password"/>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const SignInForm = Form.create()(_SignIn);
