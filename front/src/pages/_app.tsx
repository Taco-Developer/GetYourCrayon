import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import wrapper from '@/store';
import { Provider } from 'react-redux';
import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';

/** 기본 Nextpage 타입에 추가로 getLayout 타입지정 */
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/** AppProps 타입에 Components 속성이 포함된 타입 */
type AppPropsWithLayoutType = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayoutType) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  /** getLayout이 falsy값이면 대체 함수로 page매개변수를 받는다. */
  const getLayout = Component.getLayout ?? ((page) => page);
  const [bgTheme, setBgtheme] = useState('');
  useEffect(() => {
    const date = new Date();
    const nowHour = date.getHours();
    const bgThe =
      nowHour >= 6 && nowHour <= 15
        ? 'bg-after-noon'
        : nowHour >= 16 && nowHour <= 20
        ? 'bg-even-ing'
        : 'bg-night-ing';
    setBgtheme(bgThe);
  }, []);
  return (
    <Provider store={store}>
      {getLayout(
        <Container className={bgTheme}>
          <Component {...props} />
        </Container>,
      )}
    </Provider>
  );
}

export default App;

const Container = tw.div`
  w-screen
  min-h-screen
  h-full
  
  flex
  justify-center
  items-center

  
  
`;
