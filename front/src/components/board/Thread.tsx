import tw from 'tailwind-styled-components';
import type { Board } from '@/pages/board';

interface PropsTypes {
  data: Board;
}

export default function ThreadList({ data }: PropsTypes) {
  return (
    <Thread>
      <Title>{data.title}</Title>
      <Content>{data.content} </Content>
      <Time>{data.update_time}</Time>
    </Thread>
  );
}

const Thread = tw.div`
    border-t-2
    border-custom-gray
    py-2
    font-['SUIT']
    h-full
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
    
    text-custom-gray
`;
const Time = tw.div`
    
    text-custom-gray
`;
