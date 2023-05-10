import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameModalStatusType {
  isRoundStartModalOpened: boolean;
  isRoundEndModalOpened: boolean;
}

const INIT_MODAL: GameModalStatusType = {
  isRoundStartModalOpened: false,
  isRoundEndModalOpened: false,
};

const initialState = INIT_MODAL;

const GameModalSlice = createSlice({
  name: 'gameModalStatus',
  initialState,
  reducers: {
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

    /** 라운드 종료 모달 열기 */
    closeRoundEndModal(state) {
      state.isRoundEndModalOpened = false;
    },
  },
});

export const {
  openRoundStartModal,
  closeRoundStartModal,
  openRoundEndModal,
  closeRoundEndModal,
} = GameModalSlice.actions;
export default GameModalSlice.reducer;
