import Image from 'next/image';
import type { NextPageWithLayout } from './_app';
import Margin from '@/components/ui/Margin';
import { ReactElement } from 'react';
import Navbar from '@/components/navbar/Navbar';

export default function Home() {
  return (
    <main>
      <Margin type="height" size={100} />
      <div className="flex flex-col items-center">
        <div className="relative h-48 w-1/2">
          <Image
            src="/images/loopy.jpg"
            alt="no_img"
            priority
            fill
            sizes="100%"
          />
        </div>
        <div style={{ fontFamily: 'var(--suit-font)' }}>
          수트폰트 테스트용{'><<<'}
        </div>
        <div>나는 행복합니다람쥐</div>
        <div>203 화이팅</div>
        <div>나는 행복합니다{'<<<'}</div>
        <div>203 화이팅</div>
        <div>나는 행복합니다</div>
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Navbar>{page}</Navbar>;
};
