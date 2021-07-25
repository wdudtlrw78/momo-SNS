import React, { useCallback } from 'react';
import Head from 'next/head';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { SIGN_UP_REQUEST } from '../reducers/user';

function SignUp() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const onSubmitForm = useCallback((values) => {
    dispatch({
      type: SIGN_UP_REQUEST,
    });

    if (values) {
      alert('회원가입이 완료되었습니다.');
      Router.replace('/');
    }
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Signup | Momo.</title>
      </Head>
      <div>
        <div
          style={{
            fontFamily: 'Roboto',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#008CFF',
              fontSize: '2.25rem',
              fontFamily: 'Roboto',
              fontWeight: '700',
              marginBottom: '3rem',
            }}
          >
            Momo.
          </span>
          <Form {...formItemLayout} onFinish={onSubmitForm} form={form} style={{ width: '416px' }}>
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
              name="nickname"
              label="Nickname"
              tooltip="What do you want others to call you?"
              rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={signUpLoading}>
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
