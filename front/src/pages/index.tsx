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
  setCookie(
    'accesstoken',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0a2RndXNkbDYzQG5hdmVyLmNvbSIsInJvbGUiOiJST0xFX01FTUJFUiIsIm5pY2tuYW1lIjoic2Rmc2FkcyIsImV4cCI6MTY4NDE0NzAyNX0.S55uwOh8qWgAyTUxoZfZBlEk0eoQxcvM9hCte7BYBcM',
    { req, res },
  );
  let refr = getCookie('refreshtoken', { req, res });
  console.log(refr);
  let cookie = getCookie('accesstoken', { req, res });
  cookie = cookie ? cookie : '123';
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      Authorization: cookie,
      'Content-Type': 'application/json',
    },
  });
  try {
    const re = await api.get(`/member/myinfo`);

    const res: UserInfoType = re.data;
    console.log('tttt');
    return { props: { res } };
  } catch (e) {
    const serializedData = JSON.stringify(e);
    return { props: { e: serializedData, refr } };
  }
}

export default function Home({
  res,
  e,
  refr,
}: {
  res: UserInfoType;
  e: any;
  refr: any;
}) {
  console.log(e);
  console.log(refr);
  useEffect(() => {
    const getInfo = async () => {
      await memberAPI
        .getMyInfo()
        .then((request) => console.log(request))
        .catch((e) => console.log(e));
    };
    getInfo();
  }, []);
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
