import tw from 'tailwind-styled-components';
import type { Board } from '@/pages/board';
import Link from 'next/link';

interface PropsTypes {
  data: Board;
}

//현재시간 변환해주는 함수
const detailDate = (a: number) => {
  const milliSeconds = Date.now() - a;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

export default function ThreadList({ data }: PropsTypes) {
  let nowTime = new Date(data.boardUpdateTime).getTime() + 32400000;
  return (
    <Thread>
      <Title>{data.boardTitle}</Title>
      <Content>
        <Link href={data.boardContent}>{data.boardContent}</Link>{' '}
      </Content>
      <Time>{detailDate(nowTime)}</Time>
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
