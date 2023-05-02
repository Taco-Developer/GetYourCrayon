import React from 'react';

import { Dialog } from '@mui/material';

export default function EndRoundDialog({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) {
  const onDialogClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpened} onClose={onDialogClose} maxWidth="md" fullWidth>
      <div className="w-full h-full bg-white">라운드 종료</div>
    </Dialog>
  );
}
