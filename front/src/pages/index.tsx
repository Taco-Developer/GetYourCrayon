import Margin, { MarginType } from '@/components/ui/Margin';
import { ReactElement, useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import tw from 'tailwind-styled-components';
import MainCarousel from '@/components/main/MainCarousel';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { memberAPI } from '@/api/api';

export interface UserInfoType {
  userIdx: number;
  userEmail: string;
  userNickname: string;
  userPoint: number;
  userProfile: null | string;
}

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  let refr = getCookie('refreshtoken', { req, res });
  let cookie = getCookie('accesstoken', { req, res });
  cookie = cookie ? cookie : '123';
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: cookie,
      'Content-Type': 'application/json',
      Cookie: `refreshtoken=` + refr,
    },
  });
  try {
    const re = await api.get(`/member/myinfo`);
    const res: UserInfoType = re.data;
    return { props: { res } };
  } catch (e) {
    const serializedData = JSON.stringify(e);
    return { props: { e: serializedData } };
  } finally {
    api.defaults.headers.Cookie = '';
  }
}

export default function Home({ res }: { res: UserInfoType }) {
  console.log(res);
  return (
    <MainContainer>
      <Margin type={MarginType.height} size={150} />
      <div className="">
        <MainCarousel />
      </div>
    </MainContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Navbar>{page}</Navbar>;
};

const MainContainer = tw.div`
  w-screen
  xl:w-10/12
  min-h-container-height
  h-full
  
`;
