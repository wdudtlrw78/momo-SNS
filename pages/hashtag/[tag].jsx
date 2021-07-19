import { useRouter } from 'next/router';
import React from 'react';

function Hashtag() {
  const router = useRouter();
  const { tag } = router.query;
  return <div>{tag}</div>;
}

export default Hashtag;
