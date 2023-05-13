import Margin, { MarginType } from '@/components/ui/Margin';
import { ReactElement, useEffect, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import tw from 'tailwind-styled-components';
import MainCarousel from '@/components/main/MainCarousel';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { setUser } from '@/store/slice/userSlice';
import wrapper from '@/store';
import type { GetServerSideProps } from 'next';
import Login from '@/components/login/Login';
export interface UserInfoType {
  userIdx: number;
  userEmail: string;
  userNickname: string;
  userPoint: number;
  userProfile: null | string;
}

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
//       // Cookie: `refreshtoken=` + refr,
//     },
//   });
//   try {
//     const re = await api.get(`/member/myinfo`);
//     const res: UserInfoType = re.data;
//     return { props: { res } };
//   } catch (e) {
//     const serializedData = JSON.stringify(e);
//     console.log(e);
//     return { props: { e: serializedData } };
//   } finally {
//     api.defaults.headers.Cookie = '';
//   }
// }

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context: any) => {
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
        // Cookie: `refreshtoken=` + refr,
      },
    });
    try {
      const re = await api.get(`/member/myinfo`);
      const res: UserInfoType = re.data;
      store.dispatch(setUser(res));
      // return { props: { res } };
      return { props: { message: 'Login' } };
    } catch (e) {
      const serializedData = JSON.stringify(e);
      console.log(e);
      return { props: { message: 'notLogin' } };
      // return { props: { e: serializedData } };
    } finally {
      api.defaults.headers.Cookie = '';
    }
  });

export default function Home({ message }: { message: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (message === 'notLogin') {
      setOpen(true);
    }
  }, [message]);
  //리덕스에 초기값넣어주기.
  // dispatch(setUser(res));
  const { userInfo } = useAppSelector((state) => state);
  console.log(userInfo);
  return (
    <MainContainer>
      <Margin type={MarginType.height} size={150} />
      <div className="">
        <MainCarousel />
      </div>
      <Login open={open} setOpen={setOpen} />
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
