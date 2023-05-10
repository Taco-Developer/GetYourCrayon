import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Dropdown from '../../../ui/Dropdown';

export default function Setting() {
  const [timeOption, setTimeOption] = useState<{
    label: string;
    value: string | number;
  }>();

  const [turnOption, setTurnOption] = useState<{
    label: string;
    value: string | number;
  }>();

  const timeOptions = [
    { label: '느리게', value: 1 },
    { label: '보통', value: 2 },
    { label: '빠르게', value: 3 },
  ];

  const turnOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  const timeOptionChange = (option: {
    label: string;
    value: string | number;
  }) => {
    setTimeOption(option);
  };
  const turnOptionChange = (option: {
    label: string;
    value: string | number;
  }) => {
    setTurnOption(option);
  };

  return (
    <OutDiv>
      <SelectDiv>
        시간
        <DropDiv>
          <Dropdown
            base={timeOptions[1]}
            options={timeOptions}
            onChange={timeOptionChange}
            Option={timeOption}
          />
        </DropDiv>
      </SelectDiv>
      <SelectDiv>
        턴
        <DropDiv>
          <Dropdown
            base={turnOptions[2]}
            options={turnOptions}
            onChange={turnOptionChange}
            Option={turnOption}
          />
        </DropDiv>
      </SelectDiv>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-30 w-full flex flex-col items-center justify-center`;
const SelectDiv = tw.div`h-40 w-full text-3xl border-white border-2 rounded-xl flex flex-row items-center justify-between my-1 px-5`;
const DropDiv = tw.div`h-70 w-40 border-white border-2 rounded-xl`;
