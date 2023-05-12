import Pagination from 'react-js-pagination';
import { useState } from 'react';
import type { BoardPaginationType } from '@/pages/board';
import { useRouter } from 'next/router';
import { boardAPI } from '@/api/api';

interface PropsTypes {
  boardData: BoardPaginationType;
  setBoardData: React.Dispatch<React.SetStateAction<BoardPaginationType>>;
}

export default function Paging({ boardData, setBoardData }: PropsTypes) {
  const router = useRouter();
  const { id } = router.query;
  const handlePageChange = (page: number) => {
    const changePages = async (page: number) => {
      await boardAPI
        .getBoard(page - 1)
        .then((request) => {
          setBoardData(request.data);
        })
        .catch((e) => console.log(e));
    };
    changePages(page);
  };
  return (
    <Pagination
      activePage={boardData.number + 1}
      itemsCountPerPage={boardData.size}
      totalItemsCount={boardData?.totalElements}
      pageRangeDisplayed={5}
      prevPageText={'<'}
      nextPageText={'>'}
      hideDisabled={true}
      onChange={handlePageChange}
    />
  );
}
