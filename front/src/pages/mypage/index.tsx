import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from '@/components/navbar/Navbar';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import UserInfo from '@/components/mypage/UserInfo';
import Contents from '@/components/mypage/Contents';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import wrapper from '@/store';
import { setLogin } from '@/store/slice/loginSlice';
import { setMypage } from '@/store/slice/mypageSlice';
import Login from '@/components/login/Login';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context: any) => {
    const { req, res } = context;
    let refreshtoken = getCookie('refreshtoken', { req, res });
    let accesstoken = getCookie('accesstoken', { req, res });
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: accesstoken,
        'Content-Type': 'application/json',
        Cookie: `refreshtoken=` + refreshtoken,
      },
    });
    try {
      const re = await api.get(`/user/mypage/profile`);
      const res = re.data.body;
      store.dispatch(setLogin({ isLogin: true }));
      store.dispatch(setMypage(res));
      return { props: { message: 'Login' } };
    } catch (e) {
      console.log(e);
      store.dispatch(setLogin({ isLogin: false }));
      return { props: { message: 'notLogin' } };
    } finally {
      api.defaults.headers.Cookie = '';
    }
  });

// export async function getServerSideProps(context: any) {
//   const { req, res } = context;

//   //로컬에서 테스트할시엔 setCookie 이용해서 refreshtoken과 accesstoken을 넣어줘야합니다.
//   let refr = getCookie('refreshtoken', { req, res });
//   let cookie = getCookie('accesstoken', { req, res });
//   cookie = cookie ? cookie : '123';
//   const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//       Authorization: cookie,
//       'Content-Type': 'application/json',
//       Cookie: `refreshtoken=` + refr,
//     },
//   });
//   try {
//     const re = await api.get(`/member/myinfo`);
//     const res: UserInfoType = re.data;
//     return { props: { res } };
//   } catch (e) {
//     const serializedData = JSON.stringify(e);
//     return { props: { e: serializedData } };
//   } finally {
//     api.defaults.headers.Cookie = '';
//   }
// }

export default function MyPage({ message }: { message: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(message);
    if (message === 'notLogin') {
      setOpen(true);
    }
  }, []);
  return (
    <Container>
      <UserInfo />
      <Contents />
      <Login open={open} setOpen={setOpen} />
    </Container>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Navbar>{page}</Navbar>;
};

const Container = tw.div`
  w-screen
  xl:w-10/12
  md:w-9/12
  gap-2
  grid-cols-12 
  grid
  min-h-container-height2
  h-full
  mt-36
  mb-12
`;
