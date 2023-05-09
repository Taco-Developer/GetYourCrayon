import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Dropdown from './Dropdown';

export default function Setting() {
  const [timeOption, setTimeOption] = useState<{
    label: string;
    value: string | number;
  }>();

  const [turnOption, setTurnOption] = useState<{
    label: string;
    value: string | number;
  }>();

  function timeOptionChange(option: { label: string; value: string | number }) {
    setTimeOption(option);
  }
  function turnOptionChange(option: { label: string; value: string | number }) {
    setTurnOption(option);
  }

  return (
    <OutDiv>
      <SelectDiv>
        시간
        <Dropdown
          options={[
            { label: '느리게', value: '1' },
            { label: '보통', value: '2' },
            { label: '빠르게', value: '3' },
          ]}
          onChange={timeOptionChange}
          Option={timeOption}
        />
      </SelectDiv>
      <SelectDiv>
        턴
        <Dropdown
          options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
          ]}
          onChange={turnOptionChange}
          Option={turnOption}
        />
      </SelectDiv>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-30 w-full flex flex-col items-center justify-center`;
const SelectDiv = tw.div`h-40 w-full text-3xl border-white border-2 rounded-xl flex flex-row items-center justify-between my-1 px-5`;
