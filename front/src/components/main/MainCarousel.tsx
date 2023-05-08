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
        onSlideChange={() => console.log('ehlsi?')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="flex items-center justify-center">
            <div className="relative h-96 w-full">
              <Image
                src="/images/loopy.jpg"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center">
            <div className="relative h-96 w-1/2">
              <Image
                src="/images/loopy2.jpg"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center">
            <div className="relative h-96 w-1/2">
              <Image
                src="/images/loopy3.jpg"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center">
            {' '}
            <div className="relative h-96 w-1/2">
              <Image
                src="/images/loopy4.jpg"
                alt="no_img"
                priority
                fill
                sizes="100%"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
