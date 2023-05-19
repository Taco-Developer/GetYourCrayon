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
        const accessToken = 'Bearer ' + router.query.accesstoken;
        localStorage.setItem('accesstoken', accessToken);
        const expiryDate = new Date(Number(new Date()) + 315360000000);
        setCookie('accesstoken', accessToken, {
          expires: expiryDate,
          maxAge: 315360000000,
          secure: true,
          sameSite: 'none',
        });
        router.push('/');
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, [router]);
  return <div></div>;
}
