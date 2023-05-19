import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

interface PropsTypes {
  isOpenOne: boolean;
  setIsOpenOne: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OneModal({ isOpenOne, setIsOpenOne }: PropsTypes) {
  const handleClose = () => {
    setIsOpenOne(false);
  };

  return (
    <div>
      <Dialog open={isOpenOne} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}
