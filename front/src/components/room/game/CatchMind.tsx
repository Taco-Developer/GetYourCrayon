import React, { useEffect } from 'react';

import Drawing from './roles/Drawing';
import Solving from './roles/Solving';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import Loading from '@/components/ui/Loading';
import { changeRole } from '@/store/slice/game/userRoleSlice';

export default function CatchMinde({ socket }: { socket: WebSocket }) {
  const {
    userRole,
    gameDatas: { selectedUserIdx },
    userInfo: { userIdx },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedUserIdx) return;
    let role;
    if (selectedUserIdx === userIdx) {
      role = 'drawing';
    } else {
      role = 'solving';
    }
    dispatch(changeRole(role));
  }, [dispatch, selectedUserIdx, userIdx]);

  switch (userRole) {
    case 'drawing':
      return <Drawing socket={socket} />;
    case 'solving':
      return <Solving isReverseGame={false} socket={socket} />;
    default:
      return <Loading />;
  }
}
