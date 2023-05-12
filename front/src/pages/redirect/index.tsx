import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = router.query.accesstoken;
        localStorage.setItem('accesstoken', 'Bearer ' + accessToken);
        setCookie('accessToken', 'Bearer' + accessToken, { httpOnly: true });
        router.push('/');
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, [router]);
  return <div></div>;
}
