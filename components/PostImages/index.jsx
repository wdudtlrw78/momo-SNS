import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

function PostImages({ images }) {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  });

  if (images.length === 1) {
    return (
      <>
        {/* role: 시각장애인분들을 위해 스크린 리더에서 굳이 얘를 클릭 할 필요있다 여부를 안알려줄때만 넣어준다. */}
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        {/* role: 시각장애인분들을 위해 스크린 리더에서 굳이 얘를 클릭 할 필요있다 여부를 안알려줄때만 넣어준다. */}
        <img
          role="presentation"
          style={{ width: '50%', display: 'inline-block' }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ width: '50%', display: 'inline-block' }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
      </>
    );
  }
  return (
    <>
      <img
        role="presentation"
        style={{ width: '50%', display: 'inline-block' }}
        src={images[0].src}
        alt={images[0].src}
      />
      <div
        role="presentation"
        style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </div>
    </>
  );
}
PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default PostImages;
