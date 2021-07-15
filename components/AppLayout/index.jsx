import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Affix, Button, Input, Space } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { HeadContainer, MainContainer } from './styles';

const { Search } = Input;

function AppLayouts({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onSearch = (value) => console.log(value);

  return (
    <>
      <Affix offsetTop={0}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 16px',
            height: '54px',
            boxShadow: '1px 3px 0 0 rgb(0 0 0 / 8%)',
            background: '#FFF',
          }}
        >
          <HeadContainer>
            <div className="logo">
              <Link href="/">
                <a>
                  <span
                    style={{
                      display: 'inline-block',
                      color: '#008CFF',
                      fontSize: '2.25rem',
                      fontFamily: 'Roboto',
                      fontWeight: '700',
                    }}
                  >
                    Momo.
                  </span>
                </a>
              </Link>
            </div>
            <Space direction="vertical">
              <Search id="search" placeholder="tag search..." style={{ width: '215px' }} onSearch={onSearch} />
            </Space>
            {isLoggedIn ? (
              <div className="menu-group" style={{ display: 'flex' }}>
                <div
                  className="postup"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '36px',
                    height: '36px',
                    border: '1px solid #292929',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    marginRight: '16px',
                  }}
                >
                  <Link href="/postup">
                    <a>
                      <PlusOutlined style={{ paddingBottom: '2px', fontSize: '14px', color: '#292929' }} />
                    </a>
                  </Link>
                </div>
                <div
                  className="user-info"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '36px',
                    height: '36px',
                    border: '1px solid #292929',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                >
                  <UserOutlined style={{ fontSize: '14px', color: '#292929' }} />
                </div>
              </div>
            ) : (
              <Button>
                <Link href="/signin">
                  <a>Sign In</a>
                </Link>
              </Button>
            )}
          </HeadContainer>
        </header>
      </Affix>
      <main style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <MainContainer>{children}</MainContainer>
      </main>
    </>
  );
}

AppLayouts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayouts;
