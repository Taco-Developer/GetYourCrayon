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
  userProfile: string | null;
  userPoint: number;
}

interface GachaItem {
  allgachaIdx: number;
  allgachaImg: string;
  allgachaClass: string;
}

export interface MypageStateType {
  profile: UserProfile;
  gacha: GachaItem[];
}

const initialState: MypageStateType = {
  profile: {
    userIdx: 0,
    userNickname: '',
    userProfile: null,
    userPoint: 0,
  },
  gacha: [],
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
