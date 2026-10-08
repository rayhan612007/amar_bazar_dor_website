import React, { Suspense } from 'react';
import Herosection from './hero/Herosection';
import AllProductpage from './all_Product/page';

const homepage = () => {
  return (
    <Suspense fallback='<p>loading...</p>'>
      <Herosection />
      <AllProductpage />
    </Suspense>
  );
};

export default homepage;