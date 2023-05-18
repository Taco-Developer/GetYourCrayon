import React from 'react';
import tw from 'tailwind-styled-components';
import Collection from './collection/Collection';
import Gacha from './gacha/Gacha';
import { useState } from 'react';

/** 가챠, 컬렉션 컴포넌트 */
export default function Contents() {
  const [typeCheck, setTypeCheck] = useState([false, true]);

  return (
    <ContentsDiv className="overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full overflow-hidden">
        <TypeBar>
          {typeCheck[0] === true ? (
            <TypeBtnOn className="me-1">
              <TypeDiv>컬렉션</TypeDiv>
            </TypeBtnOn>
          ) : (
            <TypeBtnOff
              className="me-1"
              onClick={() => {
                setTypeCheck([true, false]);
              }}
            >
              <TypeDiv>컬렉션</TypeDiv>
            </TypeBtnOff>
          )}
          {typeCheck[1] === true ? (
            <TypeBtnOn className="ms-1">
              <TypeDiv>가챠퐁</TypeDiv>
            </TypeBtnOn>
          ) : (
            <TypeBtnOff
              className="ms-1"
              onClick={() => {
                setTypeCheck([false, true]);
              }}
            >
              <TypeDiv>가챠퐁</TypeDiv>
            </TypeBtnOff>
          )}
        </TypeBar>
        <div className="h-full bg-board-color w-full overflow-hidden flex flex-col relative">
          {typeCheck[0] && <Collection />}
          {typeCheck[1] && <Gacha />}
        </div>
      </div>
    </ContentsDiv>
  );
}

const ContentsDiv = tw.div`
 col-span-9 
 h-full 
 w-full 
`;

const TypeBar = tw.div`
 w-full
 h-profile-menu
 flex 
 flex-row 
 justify-center 
 text-center 
 `;
const TypeBtnOff = tw.div`
 w-full
 h-full
 rounded-t-2xl 
 text-apple-red
 
 cursor-pointer 
 text-lg
 md:text-2xl
 bg-board-color
 `;
const TypeBtnOn = tw.div`
 w-full
 h-full
 rounded-t-2xl 
 text-apple-green
 text-2xl
 md:text-3xl 
 cursor-pointer 
 

 drop-shadow-lg
 
 bg-board-color`;

const TypeDiv = tw.div`
  flex 
  justify-center 
  h-full 
  items-center
 `;
