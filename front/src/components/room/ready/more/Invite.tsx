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

interface ReadyProps {
  copyAction: (url: string) => void;
  createAction: (title: string, url: string) => void;
}

export default function Invite({ copyAction, createAction }: ReadyProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
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
        PaperProps={{
          style: {
            width: '100vw',
          },
        }}
      >
        <CustomDialogTitle onClose={ClickClose} />
        <DialogContent>
          <ModalDiv>
            <TopDiv>
              <TitleInput
                type="text"
                value={title}
                placeholder="같이할사람 여기여기 붙어라 :)"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </TopDiv>
            <UnderDiv>
              <ModalBtn
                onClick={() => {
                  copyAction('url');
                }}
              >
                초대링크 복사
              </ModalBtn>
              <ModalBtn
                onClick={() => {
                  createAction(title, 'url');
                  ClickClose();
                }}
              >
                게시글 작성
              </ModalBtn>
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
const TopDiv = tw.div`w-full flex text-2xl mt-1 mb-5 items-center justify-center`;
const TitleInput = tw.input`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2`;
const UnderDiv = tw.div`w-full flex items-center justify-between`;
const ModalBtn = tw.button`h-16 w-40 bg-main-green hover:bg-main-pink text-white rounded-xl text-3xl`;
