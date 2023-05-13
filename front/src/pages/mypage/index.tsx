import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from '@/components/navbar/Navbar';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import UserInfo from '@/components/mypage/UserInfo';
import Contents from '@/components/mypage/Contents';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { memberAPI } from '@/api/api';

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

export default function MyPage() {
  useEffect(() => {
    const getInfo = async () => {
      await memberAPI
        .getUserInfo()
        .then((request) => console.log(request.data))
        .catch((e) => console.log(e));
    };
    getInfo();
  }, []);
  return (
    <Container>
      <UserInfo />
      <Contents />
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
