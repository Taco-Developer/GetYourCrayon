import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Dropdown from '../../../ui/Dropdown';

interface UserListProps {
  setUserCnt: React.Dispatch<React.SetStateAction<number>>;
}

export default function UserDrop({ setUserCnt }: UserListProps) {
  const [cntOption, setCntOption] = useState<{
    label: string;
    value: string | number;
  }>();
  const cntOptionChange = (option: {
    label: string;
    value: string | number;
  }) => {
    setCntOption(option);
    if (typeof option.value === 'number') {
      let cnt = option.value;
      setUserCnt(cnt);
    }
  };

  const cntOptions = [
    { label: '3명', value: 3 },
    { label: '4명', value: 4 },
    { label: '5명', value: 5 },
    { label: '6명', value: 6 },
  ];

  return (
    <OutDiv>
      <Dropdown
        base={cntOptions[1]}
        options={cntOptions}
        onChange={cntOptionChange}
        Option={cntOption}
      />
    </OutDiv>
  );
}

const OutDiv = tw.div`w-80 h-10 font-bold text-xl xl:text-3xl flex items-center justify-start border-black border-2 rounded-lg`;
