import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import BasicCard from './CardComponent';

export interface GachaType {
  existGacha: boolean;
  gachaClass: string;
  gachaIdx: number;
  gachaImg: string;
}

interface PropsTypes {
  isOpenTen: boolean;
  setIsOpenTen: React.Dispatch<React.SetStateAction<boolean>>;
  gachaData: GachaType[];
}

export default function TenModal({
  isOpenTen,
  setIsOpenTen,
  gachaData,
}: PropsTypes) {
  const handleClose = () => {
    setIsOpenTen(false);
  };
  return (
    <div>
      <Dialog
        open={isOpenTen}
        onClose={handleClose}
        maxWidth={false}
        PaperProps={{
          style: { backgroundColor: 'transparent', boxShadow: 'none' },
        }}
      >
        <DialogTitle>
          <div className="font-bold text-white text-4xl md:text-7xl font-['CookieRun'] text-center">
            Reward
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-5 gap-4 justify-center items-center  border-y-8 border-y-apple-yellow  overflow-hidden ">
            {gachaData.map((data, i) => {
              return <BasicCard key={i} data={data} />;
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
