import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

export default function SideDisplay({
  isLeft,
  children,
}: {
  isLeft: boolean;
  children: ReactNode;
}) {
  return <SideContainer data-left={isLeft}>{children}</SideContainer>;
}

const SideContainer = tw.div<{ 'data-left': boolean }>`
 ${(props) => (props['data-left'] ? 'col-span-2' : 'col-span-3')}
  h-full

  flex
  flex-col
  items-center
  justify-between
  
  overflow-hidden
`;
