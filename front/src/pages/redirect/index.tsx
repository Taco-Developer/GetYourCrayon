import React from 'react';

export default function Redirect() {
  const url = new URL(document.location.href).searchParams;
  console.log(url);
  return <div>Redirect Page</div>;
}
