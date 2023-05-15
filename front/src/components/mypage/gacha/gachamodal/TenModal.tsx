import { Backdrop } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

interface PropsTypes {
  isOpenTen: boolean;
  setIsOpenTen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TenModal({ isOpenTen, setIsOpenTen }: PropsTypes) {
  const handleClose = () => {
    setIsOpenTen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpenTen}
        onClose={handleClose}
        PaperProps={{
          style: { backgroundColor: 'transparent', boxShadow: 'none' },
        }}
      >
        <DialogTitle sx={{ color: 'black' }}>{'아무것도몰라요'}</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}
