import tw from 'tailwind-styled-components';
import Image from 'next/image';
import type { PropsTypes } from '../CollectionCard';
import { useState } from 'react';
import { memberAPI } from '@/api/api';
import { useAppDispatch } from '@/store/thunkhook';
import { setMypage } from '@/store/slice/mypageSlice';
import { setUser } from '@/store/slice/userSlice';
//mui import
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export interface ImagePropsTypes {
  data: PropsTypes;
}

export default function CollectionImageModal({ data }: ImagePropsTypes) {
  const [imageOpen, setImageOpen] = useState(false);
  const dispatch = useAppDispatch();
  const ClickClose = () => {
    setImageOpen(false);
  };
  const ClickOpen = () => {
    setImageOpen(true);
  };

  return (
    <>
      <button onClick={ClickOpen}>자세히보기</button>
      <Dialog open={imageOpen} onClose={ClickClose}>
        <DialogContent>
          <div className="relative w-profile-img h-profile-img">
            <Image
              src={data.gachaImg}
              alt="no_img"
              priority
              fill
              sizes="100%"
            />
          </div>
          <div className="flex flex-col justify-center items-end">
            <button
              onClick={() => {
                const changeImage = async () => {
                  try {
                    await memberAPI.changeProfile(data.gachaIdx);
                    const request = await memberAPI.getUserInfo();
                    dispatch(setMypage(request.data.body));
                    dispatch(setUser(request.data.body.profile));
                  } catch (e) {
                    console.log(e);
                  } finally {
                    setTimeout(() => {
                      setImageOpen(false);
                    }, 200);
                  }
                };
                changeImage();
              }}
            >
              이미지변경
            </button>
            <button onClick={ClickClose}>닫기</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
