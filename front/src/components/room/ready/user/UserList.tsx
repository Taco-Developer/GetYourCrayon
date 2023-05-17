import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import UserDrop from './UserDrop';
import { gameAPI } from '@/api/api';
import { useAppSelector } from '@/store/thunkhook';

export interface UserData {
  roomIdx: string | null;
  userIdx: number;
  userNickname: string;
  userProfile: string;
  userPoint: number;
  userScore: number;
}

interface ReadyPropsType {
  userList: UserData[];
}

export default function UserList({ userList }: ReadyPropsType) {
  const [userCnt, setUserCnt] = useState<number>(0);
  const [userMaxCnt, setUserMaxCnt] = useState<number>(6);
  const { roomIdx } = useAppSelector((state) => state.roomIdx);

  const roomInfo = async (idx: string) => {
    await gameAPI
      .findRoom(idx)
      .then((request) => console.log(request.data))
      .catch((err) => console.log(err));
  };
  console.log(userList);

  useEffect(() => {
    setUserCnt(userList.length);
  }, [userList]);

  return (
    <UserBody>
      <TitleDiv
        onClick={() => {
          roomInfo(roomIdx!);
        }}
      >
        플레이어 {userCnt}/{userMaxCnt}
      </TitleDiv>
      <UserDrop setUserMaxCnt={setUserMaxCnt} />
      <ListDiv>
        {userList.map((user, i) => (
          <UserDiv key={i}>
            <Profile>
              <Image
                src={user.userProfile}
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </Profile>
            <InnerDiv>
              <UserName>{user.userNickname}</UserName>
            </InnerDiv>
          </UserDiv>
        ))}
      </ListDiv>
    </UserBody>
  );
}

const UserBody = tw.div`w-90 h-full bg-white bg-opacity-50 rounded-2xl flex flex-col items-center justify-center`;
const TitleDiv = tw.div`w-full h-10 font-bold text-3xl xl:text-5xl m-2 flex items-center justify-center`;
const ListDiv = tw.div`w-90 h-80 m-2 grid grid-rows-6`;
const UserDiv = tw.div`w-90 h-90 m-auto p-1 border-white border-2 rounded-l-3xl rounded-r-xl flex items-center justify-between`;
const Profile = tw.div`h-16 w-16 border-white border-1 rounded-full bg-slate-100 block relative overflow-hidden`;
const InnerDiv = tw.div`h-full w-full flex items-center justify-between`;
const UserName = tw.div`text-sm xl:text-2xl m-4`;
const CtrlDiv = tw.div`flex items-center justify-center`;
const MicIcon = tw.div`h-9 xl:h-9 w-9 xl:w-7`;
