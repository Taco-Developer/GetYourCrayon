import Margin, { MarginType } from '@/components/ui/Margin';
import { ReactElement, useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import tw from 'tailwind-styled-components';
import MainCarousel from '@/components/main/MainCarousel';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { setUser } from '@/store/slice/userSlice';

export interface UserInfoType {
  userIdx: number;
  userEmail: string;
  userNickname: string;
  userPoint: number;
  userProfile: null | string;
}

export async function getServerSideProps(context: any) {
  const { req, res } = context;

  //로컬에서 테스트할시엔 setCookie 이용해서 refreshtoken과 accesstoken을 넣어줘야합니다.
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
  const dispatch = useAppDispatch();
  dispatch(setUser(res));
  const { userInfo } = useAppSelector((state) => state);
  console.log(userInfo);
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
