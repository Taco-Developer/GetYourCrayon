import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InGameChatDataType {
  user: string;
  status: string;
  content: string;
  userIdx: number;
}

const initialState: InGameChatDataType[] = [];

const inGameChatDatasSlice = createSlice({
  name: 'inGameChatDatas',
  initialState,
  reducers: {
    /** 채팅 */
    addInGameChat(state, action: PayloadAction<InGameChatDataType>) {
      state.push(action.payload);
    },

    /** 채팅 리셋 */
    resetInGameChat(state) {
      return [];
    },
  },
});

export const { addInGameChat } = inGameChatDatasSlice.actions;
export default inGameChatDatasSlice.reducer;
