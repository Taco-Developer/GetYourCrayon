import tw from 'tailwind-styled-components';

export default function Collection() {
  return <CollectionDiv>컬렉션컴포넌트입니다.</CollectionDiv>;
}

const CollectionDiv = tw.div`
  flex
  felx-col
  justify-center
  items-center
  h-full
  w-full
`;
