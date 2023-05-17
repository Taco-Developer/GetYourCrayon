import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import CollectionImageModal from './imagemodal/ImageModal';
import { setPriority } from 'os';

export interface PropsTypes {
  gachaIdx: number;
  gachaImg: string;
}

const ColleCard = styled(Card)(`
  width : 7vw;
`);

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

export default function CollectionCard({
  data,
  key,
}: {
  data: PropsTypes;
  key: number;
}) {
  return (
    <ColleCard
      className="flex flex-col items-center relative"
      sx={{ margin: 1 }}
    >
      <CardContentNoPadding>
        <div className="w-colle-img h-colle-img relative ">
          <Image
            src={data.gachaImg}
            alt="no_img"
            priority
            fill
            sizes="100%"
            quality={25}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </div>
      </CardContentNoPadding>
      <CollectionImageModal data={data} />
    </ColleCard>
  );
}
