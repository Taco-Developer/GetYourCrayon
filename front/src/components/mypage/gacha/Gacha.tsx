import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { gatchaAPI } from '@/api/api';
import { memberAPI } from '@/api/api';
import { useAppDispatch } from '@/store/thunkhook';
import { setMypage } from '@/store/slice/mypageSlice';
import { useState } from 'react';

export default function Gacha() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [gachaData, setGachaData] = useState(null);
  const gachaEffect = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1300);
  };
  return (
    <GachaDiv>
      <Image
        src={'/images/gachabgimg.png'}
        alt="no_img"
        fill
        priority
        sizes="100%"
      />
      {isOpen ? (
        <div className=" w-bomul-img h-bomul-img absolute mb-bomul-margin  ">
          <Image
            src={'/images/openbomul.png'}
            alt="no_img"
            fill
            priority
            sizes="100%"
          />
        </div>
      ) : (
        <div className=" w-bomul-img h-bomul-img absolute mb-bomul-margin treasure-box ">
          <Image
            src={'/images/bomul.png'}
            alt="no_img"
            fill
            priority
            sizes="100%"
            className="hover:scale-125"
          />
        </div>
      )}

      <div
        className={`w-effect-gif h-effect-gif mb-bomul-margin absolute ${
          isVisible ? null : 'invisible'
        } `}
      >
        <Image
          src={'/images/effect1.gif'}
          alt="no_img"
          fill
          priority
          sizes="100%"
        />
      </div>

      <div className="z-30 flex flex-row w-full justify-between px-16 font-bold bottom-bomul-buttom-margin absolute ">
        <Button
          px={6}
          py={2}
          color="bg-apple-yellow"
          rounded="lg"
          className="hover:scale-125"
          onClick={() => {
            const getOnes = async () => {
              try {
                await gatchaAPI.oneGacha();
                const request = await memberAPI.getUserInfo();
                dispatch(setMypage(request.data.body));
                setIsOpen(true);
                gachaEffect();
              } catch (e) {
                console.log(e);
              }
            };
            getOnes();
          }}
        >
          1회 뽑기
        </Button>
        <Button
          px={6}
          py={2}
          color="bg-apple-yellow"
          rounded="lg"
          className="hover:scale-125"
          onClick={() => {
            const getTens = async () => {
              try {
                const gacha = await gatchaAPI.tenGacha();
                setGachaData(gacha.data.body.nGacha);
                const request = await memberAPI.getUserInfo();
                dispatch(setMypage(request.data.body));
                setIsOpen(true);
                gachaEffect();
              } catch (e) {
                console.log(e);
              }
            };
            getTens();
          }}
        >
          10회 뽑기
        </Button>
      </div>
    </GachaDiv>
  );
}

const GachaDiv = tw.div`
  h-full 
  w-full 
  relative 
  flex
  flex-col
  justify-center
  items-center
   
`;
