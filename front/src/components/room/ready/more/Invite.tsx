import { useState, forwardRef } from 'react';
import tw from 'tailwind-styled-components';

//mui 관련 import
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(
  props: { children: React.ReactElement },
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 4 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
          }}
          sx={{
            position: 'absolute',
            paddingBottom: 1,
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function Invite() {
  const [open, setOpen] = useState(false);
  const ClickOpen = () => {
    setOpen(true);
  };
  const ClickClose = () => {
    setOpen(false);
  };

  return (
    <OutDiv>
      <GoBtn
        onClick={() => {
          ClickOpen();
        }}
      >
        초대
      </GoBtn>
      <Dialog
        onClose={ClickClose}
        open={open}
        TransitionComponent={Transition}
        keepMounted
      >
        <CustomDialogTitle onClose={ClickClose} />
        <DialogContent>
          <ModalDiv>
            <TopDiv>
              https://getyourcrayon.co.kr/wopaef7890aw8f923rjkhawer98ty124
            </TopDiv>
            <MidDiv>
              <input placeholder="제목을 작성해 주세요" className="w-full" />
              <SendBtn>게시글작성</SendBtn>
            </MidDiv>
            <UnderDiv>
              <ModalBtn>닫기</ModalBtn>
              <ModalBtn>링크복사</ModalBtn>
            </UnderDiv>
          </ModalDiv>
        </DialogContent>
      </Dialog>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-full w-full`;
const GoBtn = tw.button`h-full w-full rounded-xl bg-main-green hover:bg-main-pink text-white text-3xl`;
const ModalDiv = tw.div`flex flex-col items-center justify-center`;
const TopDiv = tw.div`w-full flex items-center justify-center`;
const MidDiv = tw.div`w-full h-11 my-5 flex items-center justify-center`;
const UnderDiv = tw.div`w-full flex items-center justify-between`;
const SendBtn = tw.button`h-full w-40 bg-main-green hover:bg-main-pink text-white rounded-xl text-xl`;
const ModalBtn = tw.button`h-16 w-40 bg-main-green hover:bg-main-pink text-white rounded-xl text-3xl`;
