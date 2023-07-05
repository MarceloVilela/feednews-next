import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex w-full h-screen- items-center fixed top-1/2">
      <div
        className="mx-auto inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>
  )

  return (
    <div
      className="fixed left-1/2 top-1/2"
      id="loading"
    >
      <Image
        src={"/images/load.gif"}
        alt="Load indicator"
        className="w-16 h-16 mx-auto"
      />
    </div>
  );

  /*
  return (
    <svg className="spinner" viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );
  */
}