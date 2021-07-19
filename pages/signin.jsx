import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import { loginRequestAction } from '../reducers/user';

export const SignGroup = styled.div`
  @media (max-width: 575px) {
    max-width: 90%;
  }
`;

function SignIn() {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.user);
  const onSubmitForm = useCallback((values) => {
    dispatch(loginRequestAction(values));
    console.log(values);
    if (values) {
      Router.replace('/');
    }
  }, []);

  return (
    <AppLayout>
      <div
        style={{
          fontFamily: 'Roboto',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          style={{ width: '364px' }}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password autoComplete="on" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoggingIn}>
              Log in
            </Button>
          </Form.Item>
          <SignGroup style={{ width: '120%', textAlign: 'center' }}>
            Don&apos;t have an account?
            <Link href="/signup">
              <a style={{ marginLeft: '4px', color: '#008CFF' }}>Sign Up</a>
            </Link>
          </SignGroup>
        </Form>
      </div>
    </AppLayout>
  );
}

export default SignIn;
