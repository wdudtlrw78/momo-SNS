import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function PostCardContent({ postData }) {
  return (
    <div style={{ color: '#292929' }}>
      {postData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={v}>
              <a style={{ color: '#008CFF' }}>{v}</a>
            </Link>
          );
        }

        return v;
      })}
    </div>
  );
}

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent;
