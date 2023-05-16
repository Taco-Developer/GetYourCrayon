import tw from 'tailwind-styled-components';
import { useAppSelector } from '@/store/thunkhook';
import CollectionCard from './CollectionCard';

export default function Collection() {
  const { mypageInfo } = useAppSelector((state) => state);
  return (
    <CollectionDiv className="max-h-96 overflow-hidden">
      <div>
        Superrare
        <div className="grid grid-cols-5">
          {mypageInfo.gacha[0].superRare.map((data, i) => {
            return <CollectionCard data={data} key={i} />;
          })}
        </div>
      </div>
      <div>
        Rare
        <div className="grid grid-cols-5">
          {mypageInfo.gacha[0].rare.map((data, i) => {
            return <CollectionCard data={data} key={i} />;
          })}
        </div>
      </div>
      <div>
        Normal
        <div className="grid grid-cols-5">
          {mypageInfo.gacha[0].normal.map((data, i) => {
            return <CollectionCard data={data} key={i} />;
          })}
        </div>
      </div>
    </CollectionDiv>
  );
}

const CollectionDiv = tw.div`
  flex
  flex-col

  h-full
  w-full
`;
