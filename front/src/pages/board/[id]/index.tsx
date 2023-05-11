import { ReactElement, useEffect, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Margin from '@/components/ui/Margin';
import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { boardAPI } from '@/api/api';
import ThreadList from '@/components/board/Thread';

interface Board {
  id: number;
  title: string;
  content: string;
  create_time: string;
  update_time: string;
}

interface Pageable {
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface BoardPaginationType {
  content: Board[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  try {
    const re = await boardAPI.getBoard(id);
    const res: BoardPaginationType = re.data;

    return { props: { res } };
  } catch (e) {
    return { props: {} };
  }
  S;
}

export default function Board({ res }: { res: BoardPaginationType }) {
  const [boardData, setBoardData] = useState(null);
  // useEffect(() => {
  //   const getBoard = async () => {
  //     await boardAPI
  //       .getBoard(1)
  //       .then((request) => console.log(request))
  //       .catch((e) => console.log(e));
  //   };
  //   getBoard()
  // }, []);
  console.log(res.content);
  return (
    <Container>
      <div className="text-xl md:text-2xl lg:text-3xl text-center mb-4 ">
        링크를 통하여 접속해주세요 !
      </div>

      <ThreadLast>
        <Title>같이 리버스 캐치마인드 할사람~~~~~</Title>
        <Content>접속링크 어쩌고~~~~~~~~~~~~~~ </Content>
        <Time>방금 전</Time>
      </ThreadLast>
    </Container>
  );
}
Board.getLayout = function getLayout(page: ReactElement) {
  return <Navbar>{page}</Navbar>;
};

const Container = tw.div`
  w-screen
  xl:w-10/12
  md:w-9/12

  min-h-container-height2
  h-full
  border-2
  mt-36
  mb-12
  bg-board-color



  px-12
  pt-4

  flex
  flex-col

  
`;

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
