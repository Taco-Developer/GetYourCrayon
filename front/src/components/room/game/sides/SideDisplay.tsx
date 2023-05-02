import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

export default function SideDisplay({ children }: { children: ReactNode }) {
  return <SideContainer>{children}</SideContainer>;
}

const SideContainer = tw.div`
  bg-amber-900
  
  col-span-2
  
  flex
  flex-col
  items-center
  justify-between
`;
