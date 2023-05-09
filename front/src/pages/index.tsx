import Margin from '@/components/ui/Margin';
import { ReactElement } from 'react';
import Navbar from '@/components/navbar/Navbar';
import tw from 'tailwind-styled-components';
import MainCarousel from '@/components/main/MainCarousel';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Home() {
  // console.log(process.env.NEXT_PUBLIC_KAKAO);
  return (
    <MainContainer>
      <Margin type="height" size={150} />
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
