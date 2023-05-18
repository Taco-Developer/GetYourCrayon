import tw from 'tailwind-styled-components';
import { useAppSelector } from '@/store/thunkhook';
import CollectionCard from './CollectionCard';

export default function Collection() {
  const { mypageInfo } = useAppSelector((state) => state);
  return (
    <CollectionDiv className="absolute overflow-auto scrollbar-bu">
      <div>
        <div className=" text-2xl lg:text-4xl text-[#e759c6] m-4">
          SuperRare
        </div>

        <div
          className={`${
            mypageInfo.gacha[0].superRare.length === 0 ? '' : 'grid grid-cols-7'
          }`}
        >
          {mypageInfo.gacha[0].superRare.length === 0 ? (
            <div className="h-colle-img w-full flex justify-center items-start">
              현재 뽑은 슈퍼레어가 없습니다.
            </div>
          ) : (
            mypageInfo.gacha[0].superRare.map((data, i) => {
              return <CollectionCard data={data} key={i} />;
            })
          )}
        </div>
      </div>
      <hr />
      <div>
        <div className=" text-2xl lg:text-4xl text-[#60e364] m-4">Rare</div>
        <div
          className={`${
            mypageInfo.gacha[0].rare.length === 0 ? '' : 'grid grid-cols-7'
          }`}
        >
          {mypageInfo.gacha[0].rare.length === 0 ? (
            <div className="h-colle-img w-full flex justify-center items-start">
              현재 뽑은 레어가 없습니다.
            </div>
          ) : (
            mypageInfo.gacha[0].rare.map((data, i) => {
              return <CollectionCard data={data} key={i} />;
            })
          )}
        </div>
      </div>
      <hr />
      <div>
        <div className=" text-2xl lg:text-4xl m-4">Normal</div>
        <div
          className={`${
            mypageInfo.gacha[0].normal.length === 0 ? '' : 'grid grid-cols-7'
          }`}
        >
          {mypageInfo.gacha[0].normal.length === 0 ? (
            <div className="h-colle-img w-full flex justify-center items-start">
              현재 뽑은 노멀이 없습니다.
            </div>
          ) : (
            mypageInfo.gacha[0].normal.map((data, i) => {
              return <CollectionCard data={data} key={i} />;
            })
          )}
        </div>
      </div>
    </CollectionDiv>
  );
}

const CollectionDiv = tw.div`
  flex
  flex-col
  flex-auto

  h-full
  w-full
`;
