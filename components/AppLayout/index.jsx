import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Affix, Avatar } from 'antd';
import useInput from '../../hooks/useInput';
import 'antd/dist/antd.css';
import { HeadContainer, MainContainer } from './styles';

function AppLayouts({ children }) {
  const [search, onChangeSearch] = useInput('');
  const { me } = useSelector((state) => state.user);

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
            <div style={{ display: 'flex' }}>
              <div
                className="user-info"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              >
                {me && (
                  <Link href="/profile">
                    <a>
                      <Avatar>{me.nickname}</Avatar>
                    </a>
                  </Link>
                )}
              </div>
            </div>
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
