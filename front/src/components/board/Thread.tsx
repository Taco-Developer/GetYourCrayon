import tw from 'tailwind-styled-components';

export default function ThreadList() {
  return (
    <Thread>
      <Title>같이 리버스 캐치마인드 할사람~~~~~</Title>
      <Content>접속링크 어쩌고~~~~~~~~~~~~~~ </Content>
      <Time>방금 전</Time>
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
    
    text-custom-gray
`;
const Time = tw.div`
    
    text-custom-gray
`;
