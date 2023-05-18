import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { SwiperSlide, Swiper } from 'swiper/react';
import {
  Navigation,
  Pagination,
  EffectFade,
  Mousewheel,
  Autoplay,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function MainCarousel() {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, EffectFade, Mousewheel, Autoplay]}
      >
        <SwiperSlide>
          <div className="flex items-center justify-center">
            <div className="relative h-carou-size w-full">
              <Image
                src="/images/carr6.png"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
            <div className="absolute top-4 left-2 text-xl lg:text-3xl bg-gray-100 bg-opacity-40 ">
              <div>친구들과 같이 게임을 해보아요</div>
              <div>어떤단어를 가지고 </div>
              <div>이 이미지를 만들었을까요?</div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex items-center justify-center">
            <div className="relative h-carou-size w-full">
              <Image
                src="/images/carr5.png"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
            <div className="absolute top-4 left-2 text-xl lg:text-3xl bg-gray-100 bg-opacity-60">
              <div>게임을 통해 얻은 포인트로</div>
              <div>뽑기를 해보세요!</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center">
            {' '}
            <div className="relative h-carou-size w-full">
              <Image
                src="/images/carr3.png"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
            <div className="absolute top-4 left-2 text-xl lg:text-3xl bg-gray-100 bg-opacity-60 ">
              <div>나만의 컬렉션을 완성해요</div>
              <div>프로필 이미지로 설정해보세요!</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center">
            <div className="relative h-carou-size w-full">
              <Image
                src="/images/carr1.png"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
            <div className="absolute top-4 left-2 text-xl lg:text-3xl bg-gray-100 bg-opacity-60 ">
              <div>시간에 따라 바뀌는 3가지 배경</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
