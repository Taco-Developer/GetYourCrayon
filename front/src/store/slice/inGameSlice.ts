import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INIT_USERS = [
  { id: 1, nickname: '아프리카청춘이다' },
  { id: 2, nickname: '벼랑위의당뇨' },
  { id: 3, nickname: '넌내게목욕값을줬어' },
  { id: 4, nickname: '돈들어손내놔' },
  { id: 5, nickname: '헬리콥터와마법사의똥' },
  { id: 6, nickname: '아무리생강캐도난마늘' },
];

export interface GameUser {
  id: number;
  nickname: string;
}

export interface ChatType {
  user: string;
  status: string;
  content: string;
}

export interface GameRoundType {
  now: number;
  total: number;
}

export interface InGameStateType {
  gameRound: GameRoundType;
  userList: GameUser[];
  chatList: ChatType[];
  leftTime: number;
  score: number;
  isGameStarted: boolean;
  category: string;
  isRoundStartModalOpened: boolean;
  isRoundEndModalOpened: boolean;
  selectedKeyword: string;
}

const initialState: InGameStateType = {
  score: 0,
  leftTime: 60,
  gameRound: { now: 1, total: 6 },
  userList: INIT_USERS,
  chatList: [],
  category: '',
  selectedKeyword: '',
  isGameStarted: false,
  isRoundStartModalOpened: true,
  isRoundEndModalOpened: false,
};

const inGameSlice = createSlice({
  name: 'inGame',
  initialState,
  reducers: {
    /** 유저 입장 */
    addUser(state, action: PayloadAction<GameUser>) {
      state.userList.push(action.payload);
    },
    /** 유저 퇴장 */
    deleteUser(state, action: PayloadAction<number>) {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload,
      );
    },

    /** 채팅 */
    addChat(state, action: PayloadAction<ChatType>) {
      state.chatList.push(action.payload);
    },

    /** 카운트 다운 */
    countDown(state) {
      state.leftTime--;
    },

    /** 라운드 시작 모달 열기 */
    openRoundStartModal(state) {
      state.isRoundStartModalOpened = true;
    },
    /** 라운드 시작 모달 닫기 */
    closeRoundStartModal(state) {
      state.isRoundStartModalOpened = false;
    },

    /** 라운드 종료 모달 열기 */
    openRoundEndModal(state) {
      state.isRoundEndModalOpened = true;
    },
    /** 라운드 종료 모달 닫기 */
    closeRoundEndModal(state) {
      state.isRoundEndModalOpened = false;
    },

    /** 라운드 시작 */
    startRound(state) {
      state.isGameStarted = true;
      state.leftTime = initialState.leftTime;
      state.isRoundStartModalOpened = false;
    },
    /** 라운드 종료 */
    endRound(state) {
      if (state.leftTime > 0) {
        state.score += 20;
      }
      state.isGameStarted = false;
      state.isRoundEndModalOpened = true;
    },

    /** 다음 라운드 */
    goNextRound(state) {
      state.gameRound.now++;
    },

    /** 주제 변경 */
    changeCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    /** 키워드 변경 */
    changeKeyword(state, action: PayloadAction<string>) {
      if (state.selectedKeyword === action.payload) {
        state.selectedKeyword = '';
        return;
      }
      state.selectedKeyword = action.payload;
    },
  },
});

export const {
  addChat,
  addUser,
  countDown,
  deleteUser,
  changeCategory,
  endRound,
  startRound,
  goNextRound,
  changeKeyword,
  closeRoundEndModal,
  closeRoundStartModal,
  openRoundEndModal,
  openRoundStartModal,
} = inGameSlice.actions;
export default inGameSlice.reducer;
