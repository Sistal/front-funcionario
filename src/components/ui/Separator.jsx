import React from 'react';

export function Separator({ className }) {
  return <div className={"h-px bg-gray-100 my-4 " + (className || '')} />;
}

export default Separator;

