import { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

type Option = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  options: Option[];
  onChange: (option: Option) => void;
  Option?: Option;
};

export default function Dropdown({ options, onChange, Option }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer onMouseLeave={closeDropdown}>
      <DropDiv>
        {Option ? Option.label : 'Select an option'}
        <DropdownButton onClick={toggleDropdown}>{'<'}</DropdownButton>
      </DropDiv>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => {
                handleItemClick(option);
                console.log(option.value);
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = tw.div`relative h-70 w-40 text-3xl`;
const DropDiv = tw.div`h-full w-full border-white border-2 rounded-xl flex flex-row items-center justify-between px-5`;
const DropdownButton = tw.div`cursor-pointer`;
const DropdownList = tw.ul`h-auto w-full text-2xl absolute bg-slate-400 list-disc z-50`;
const DropdownItem = tw.div`cursor-pointer hover:bg-slate-700 flex items-center justify-center p-2`;
