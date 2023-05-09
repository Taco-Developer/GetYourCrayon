import Margin from '@/components/ui/Margin';
import { GameUser } from '@/store/slice/inGameSlice';
import { useAppSelector } from '@/store/thunkhook';
import { Dialog } from '@mui/material';
import React, { useState } from 'react';

export default function LierSelectDialog({
  isOpened,
  onDialogClose,
}: {
  isOpened: boolean;
  onDialogClose: () => void;
}) {
  const { userList } = useAppSelector((state) => state.inGame);

  const [selectedUser, setSelectedUser] = useState<GameUser | null>(null);

  const onDialogCloseHandler = (_: object, reason: string) => {
    if (reason === 'backdropClick') return;
    onDialogClose();
  };

  const onUserClickHandler = (user: GameUser) => {
    setSelectedUser((prev) => {
      if (prev === user) return null;
      return user;
    });
  };

  const onLierSubmitHandler = () => {
    onDialogClose();
  };

  return (
    <Dialog
      open={isOpened}
      onClose={onDialogCloseHandler}
      maxWidth="xs"
      fullWidth
    >
      <div className="p-8">
        <header className="text-center">
          <h2 className="text-3xl">라이어 선택</h2>
          <Margin type="height" size={8} />
          <p className="text-gray-400">의심되는 유저를 선택하세요.</p>
        </header>
        <Margin type="height" size={24} />
        <main className="w-full">
          <ul className="flex flex-col gap-4">
            {userList.map((user) => (
              <li key={user.id} className="flex justify-between items-center">
                <span>{user.nickname}</span>
                <button
                  className={
                    selectedUser?.id === user.id
                      ? 'px-4 py-2 rounded-lg bg-red-400'
                      : 'px-4 py-2 rounded-lg bg-blue-400'
                  }
                  onClick={() => {
                    onUserClickHandler(user);
                  }}
                >
                  {selectedUser?.id === user.id ? '선택 취소' : '선택'}
                </button>
              </li>
            ))}
          </ul>
        </main>
        <Margin type="height" size={16} />
        <footer className="flex justify-center items-center">
          <button
            className={
              selectedUser !== null
                ? 'px-4 py-2 rounded-lg bg-amber-400'
                : 'px-4 py-2 rounded-lg bg-gray-400'
            }
            onClick={onLierSubmitHandler}
          >
            선택 완료
          </button>
        </footer>
      </div>
    </Dialog>
  );
}
