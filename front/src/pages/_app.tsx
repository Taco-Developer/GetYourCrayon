import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import tw from 'tailwind-styled-components';

/** 기본 Nextpage 타입에 추가로 getLayout 타입지정 */
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/** AppProps 타입에 Components 속성이 포함된 타입 */
type AppPropsWithLayoutType = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayoutType) {
  /** getLayout이 falsy값이면 대체 함수로 page매개변수를 받는다. */
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <Container>
      <Component {...pageProps} />
    </Container>,
  );
}

const Container = tw.div`
  w-screen
  min-h-screen
  h-full
  bg-after-noon



`;
