import tw from 'tailwind-styled-components';

export default function Gacha() {
  return (
    <GachaDiv className="bg-cover bg-center">가챠 컴포넌트입니다.</GachaDiv>
  );
}

const GachaDiv = tw.div`
  flex
  flex-col
  justify-center
  items-center
  h-full
  w-full
  bg-gacha-bg
`;
