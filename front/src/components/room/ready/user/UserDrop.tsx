import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import Dropdown from '../../../ui/Dropdown';
import { sendMessage } from '@/socket/messageSend';
import { useAppSelector } from '@/store/thunkhook';

interface UserListProps {
  socket: WebSocket | null;
}

export default function UserDrop({ socket }: UserListProps) {
  const { roomInfo, userInfo } = useAppSelector((state) => state);
  const [memberCnt, setMemberCnt] = useState<string>('6명');
  const [cntOption, setCntOption] = useState<{
    label: string;
    value: string | number;
  }>();

  const cntOptionChange = (option: {
    label: string;
    value: string | number;
  }) => {
    setCntOption(option);
    if (socket !== null && typeof option.value === 'number') {
      const cnt = option.value;
      sendMessage(socket, 'roomUserCnt', { roomCnt: cnt });
    }
  };

  useEffect(() => {
    setMemberCnt(`${roomInfo.roomMax}명`);
  }, [roomInfo.roomMax]);

  const cntOptions = [
    { label: '3명', value: 3 },
    { label: '4명', value: 4 },
    { label: '5명', value: 5 },
    { label: '6명', value: 6 },
  ];

  return (
    <OutDiv>
      {roomInfo.adminUserIdx === userInfo.userIdx ? (
        <Dropdown
          base={cntOptions[3]}
          options={cntOptions}
          onChange={cntOptionChange}
          Option={cntOption}
        />
      ) : (
        <OuterDiv>{memberCnt}</OuterDiv>
      )}
    </OutDiv>
  );
}

const OutDiv = tw.div`w-80 h-10 font-bold text-xl xl:text-3xl flex items-center justify-start border-white border-2 rounded-xl`;
const OuterDiv = tw.div`mx-10 font-bold text-xl xl:text-3xl`;
