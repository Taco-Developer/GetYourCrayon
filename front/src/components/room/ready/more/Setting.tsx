import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import Dropdown from '../../../ui/Dropdown';
import { sendMessage } from '@/socket/messageSend';
import { useAppSelector } from '@/store/thunkhook';

interface ReadyProps {
  socket: WebSocket | null;
}

export default function Setting({ socket }: ReadyProps) {
  const { roomInfo, userInfo } = useAppSelector((state) => state);
  const [nowTime, setNowTime] = useState<string>('보통');
  const [nowTurn, setNowTurn] = useState<string>('4');
  const [timeOption, setTimeOption] = useState<{
    label: string;
    value: string | number;
  }>();

  const [turnOption, setTurnOption] = useState<{
    label: string;
    value: string | number;
  }>();

  const timeOptions = [
    { label: '느리게', value: 1 },
    { label: '보통', value: 2 },
    { label: '빠르게', value: 3 },
  ];

  const turnOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  // Time
  // useEffect(() => {
  //   setNowTurn(`${roomInfo.maxRound}`);
  // }, [roomInfo.maxRound]);

  useEffect(() => {
    setNowTurn(`${roomInfo.maxRound}`);
  }, [roomInfo.maxRound]);

  const timeOptionChange = (option: {
    label: string;
    value: string | number;
  }) => {
    setTimeOption(option);
  };
  const turnOptionChange = (option: {
    label: string;
    value: string | number;
  }) => {
    setTurnOption(option);
    if (socket !== null) {
      const sendSocket = option.value;
      console.log(sendSocket);
      sendMessage(socket, 'gameTurn', { gameTurn: sendSocket });
    }
  };

  return (
    <OutDiv>
      <SelectDiv>
        시간
        <DropDiv>
          {roomInfo.adminUserIdx === userInfo.userIdx ? (
            <Dropdown
              base={timeOptions[1]}
              options={timeOptions}
              onChange={timeOptionChange}
              Option={timeOption}
            />
          ) : (
            <div>{nowTime}</div>
          )}
        </DropDiv>
      </SelectDiv>
      <SelectDiv>
        턴
        <DropDiv>
          {roomInfo.adminUserIdx === userInfo.userIdx ? (
            <Dropdown
              base={turnOptions[3]}
              options={turnOptions}
              onChange={turnOptionChange}
              Option={turnOption}
            />
          ) : (
            <div>{nowTurn}</div>
          )}
        </DropDiv>
      </SelectDiv>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-30 w-full flex flex-col items-center justify-center`;
const SelectDiv = tw.div`h-40 w-full text-3xl border-white border-2 rounded-xl flex flex-row items-center justify-between my-1 px-5`;
const DropDiv = tw.div`h-70 w-40 border-white border-2 rounded-xl`;
