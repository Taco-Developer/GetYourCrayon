import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

//유저 마이페이지 인포 타입
interface UserProfile {
  userIdx: number;
  userNickname: string;
  userProfile: string;
  userPoint: number;
}

interface GachaItem {
  gachaIdx: number;
  gachaImg: string;
}

interface GachaGrade {
  event: GachaItem[];
  normal: GachaItem[];
  rare: GachaItem[];
  superRare: GachaItem[];
}

export interface MypageStateType {
  profile: UserProfile;
  gacha: GachaGrade[];
}

const initialState: MypageStateType = {
  profile: {
    userIdx: 0,
    userNickname: '',
    userProfile: '',
    userPoint: 0,
  },
  gacha: [{ event: [], normal: [], rare: [], superRare: [] }],
};

const mypageSlice = createSlice({
  name: 'mypageInfo',
  initialState,
  reducers: {
    setMypage: (
      state: MypageStateType,
      action: PayloadAction<MypageStateType>,
    ) => {
      return action.payload;
    },
  },
});

export const { setMypage } = mypageSlice.actions;

export default mypageSlice;
