import tw from 'tailwind-styled-components';
import type { Board } from '@/pages/board';
import Link from 'next/link';

interface PropsTypes {
  data: Board;
}

export default function ThreadList({ data }: PropsTypes) {
  return (
    <Thread>
      <Title>{data.boardTitle}</Title>
      <Content>
        <Link href={data.boardContent}>{data.boardContent}</Link>{' '}
      </Content>
      <Time>{data.boardUpdateTime}</Time>
    </Thread>
  );
}

const Thread = tw.div`
    border-t-2
    border-custom-gray
    py-2
    font-['SUIT']
`;

const ThreadLast = tw.div`
  border-y-2
  border-custom-gray
  py-2
  font-['SUIT']
`;

const Title = tw.div`
    text-lg
`;
const Content = tw.div`
    underline
    text-custom-gray
`;
const Time = tw.div`
    
    text-custom-gray
`;
