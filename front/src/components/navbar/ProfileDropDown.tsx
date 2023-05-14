import { useEffect } from 'react';

interface PropsType extends React.PropsWithChildren<{}> {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  isClick: boolean;
}
//프로필 이미지를 클릭해서 밑에 드롭다운이 생겼을때 다른곳 클릭하면 없애주는 ref
const ProfileDropDown = ({ setIsClick, isClick, children }: PropsType) => {
  return (
    <div
      className={`${
        isClick
          ? 'animate-fade-in-up transition-all visible'
          : 'animate-fade-out-up transition-all invisible'
      } absolute mt-2 -ms-3 mb-2 z-100 pt-4  flex flex-col w-full  bg-board-color`}
    >
      {children}
    </div>
  );
};
export default ProfileDropDown;
