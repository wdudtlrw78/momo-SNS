import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Affix, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import 'antd/dist/antd.css';
import { AddPostButton, HeadContainer, MainContainer } from './styles';
import ProfileImg from '../ProfileImg';

function AppLayouts({ children }) {
  const [search, onChangeSearch] = useInput('');
  const { isLoggedIn } = useSelector((state) => state.user);

  const onSearch = useCallback((e) => {
    e.preventDefault();
    console.log(search);
  }, []);

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
            <form onSubmit={onSearch}>
              <input
                id="search"
                placeholder="tag search..."
                style={{ width: '215px' }}
                value={search}
                onChange={onChangeSearch}
              />
            </form>

            {isLoggedIn ? (
              <div style={{ display: 'flex' }}>
                <AddPostButton>
                  <Link href="/postup">
                    <a>
                      <PlusOutlined
                        className="plus"
                        style={{ paddingBottom: '2px', fontSize: '18px', color: '#292929' }}
                      />
                    </a>
                  </Link>
                </AddPostButton>

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
                  <Link href="/profile">
                    <a>
                      <ProfileImg />
                    </a>
                  </Link>
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
