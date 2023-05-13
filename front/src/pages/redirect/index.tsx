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
        const expiryDate = new Date(Number(new Date()) + 315360000000);
        setCookie('test', '1234', {
          expires: expiryDate,
          maxAge: 315360000000,
        });
        setCookie('1234', '1315', { httpOnly: true });
        setCookie('accessToken', 'Bearer ' + accessToken, {
          httpOnly: true,
          expires: expiryDate,
          maxAge: 315360000000,
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
