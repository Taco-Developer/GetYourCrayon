import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';

type Option = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  base: Option;
  options: Option[];
  onChange: (option: Option) => void;
  Option?: Option;
};

export default function Dropdown({
  base,
  options,
  onChange,
  Option,
}: DropdownProps) {
  const { roomInfo, userInfo } = useAppSelector((state) => state);
  const [btnAdmin, setBtnAdmin] = useState<boolean>(true);

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

  useEffect(() => {
    if (userInfo.userIdx === roomInfo.adminUserIdx) {
      setBtnAdmin(false);
    }
  }, [roomInfo.adminUserIdx, userInfo.userIdx]);

  return (
    <DropdownContainer onMouseLeave={closeDropdown}>
      <DropDiv>
        {Option ? Option.label : base.label}
        <DropdownButton
          className={btnAdmin ? 'hidden' : ''}
          onClick={toggleDropdown}
        >
          {'<'}
        </DropdownButton>
      </DropDiv>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => {
                handleItemClick(option);
                // console.log(option.value);
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

const DropdownContainer = tw.div`relative h-full w-full text-3xl select-none`;
const DropDiv = tw.div`h-full w-full flex flex-row items-center justify-between px-5`;
const DropdownButton = tw.div`cursor-pointer`;
const DropdownList = tw.ul`h-auto w-full text-2xl absolute bg-slate-400 rounded-xl list-disc z-50`;
const DropdownItem = tw.div`cursor-pointer hover:bg-slate-700 rounded-xl flex items-center justify-center p-1`;
