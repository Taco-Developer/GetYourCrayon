import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import type { GachaType } from './TenModal';

interface PropsTypes {
  key: number;
  data: GachaType;
}

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

const AnimatedCard = styled(Card)(`
  position: relative;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;

  &.show {
    transform: translateY(0);
    opacity: 1;
  }
`);

export default function BasicCard({ data }: PropsTypes) {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setShowCard(true);
  }, []);

  return (
    <AnimatedCard className={showCard ? 'show' : ''} sx={{ margin: 1 }}>
      <CardContentNoPadding>
        <div className="w-bomul-img h-bomul-img relative">
          <Image src={data.gachaImg} alt="no_img" priority fill sizes="100%" />
        </div>
        {data.existGacha && (
          <div
            className="absolute top-0 left-0 text-xl text-rose-600 bg-white/[0.7] "
            id="glitter-animation"
          >
            NEW!
          </div>
        )}
        <div className="absolute bottom-0 right-0 text-xl text-orange-400 ">
          {data.gachaClass}
        </div>
      </CardContentNoPadding>
    </AnimatedCard>
  );
}
