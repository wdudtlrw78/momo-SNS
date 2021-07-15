import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import { loginAction } from '../reducers';

export const SignGroup = styled.div`
  @media (max-width: 575px) {
    max-width: 90%;
  }
`;

function SignIn() {
  const dispatch = useDispatch();

  const onSubmitForm = useCallback((values) => {
    dispatch(loginAction(values));

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
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={false}>
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
