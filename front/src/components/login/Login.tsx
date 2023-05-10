import { useState, forwardRef } from 'react';
import tw from 'tailwind-styled-components';
import { Button } from '../ui/Button';
import Image from 'next/image';

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

export default function Login() {
  const [open, setOpen] = useState(false);
  const KAKAO_URL = process.env.KAKAO;
  const ClickOpen = () => {
    setOpen(true);
  };
  const ClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        px={8}
        py={2}
        rounded="lg"
        color="bg-main-pink"
        className="animate-bounce text-main-green text-xs lg:text-xl sm:text-sm"
        onClick={() => {
          ClickOpen();
        }}
      >
        로그인
      </Button>
      <Dialog
        onClose={ClickClose}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            backgroundImage: "url('/images/loopy3.jpg')",
            backgroundSize: 'cover',
            width: '35vw',
            height: '70vh',
          },
        }}
      >
        <CustomDialogTitle onClose={ClickClose} />
        <DialogContent>
          <LoginDiv id="neon">
            프로젝트 완성 하고 싶어요
            <ImageDiv
              onClick={() => {
                if (!KAKAO_URL) {
                  console.log(KAKAO_URL);
                  throw new Error('카카오 URL이 잘못되있습니다.');
                }
                console.log(KAKAO_URL);
                location.href = KAKAO_URL;
              }}
            >
              <Image src="/images/kakao.png" alt="no_img" fill sizes="100%" />
            </ImageDiv>
          </LoginDiv>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const LoginDiv = tw.div`
  flex
  flex-col
  justify-between
  items-center
  text-4xl
  w-full
  h-full
  `;
const ImageDiv = tw.div`
  h-16
  w-72
  relative
`;
