import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatType {
  user: string;
  status: string;
  content: string;
}

const initialState: ChatType[] = [];

const chatDatasSlice = createSlice({
  name: 'chatDatas',
  initialState,
  reducers: {
    /** 채팅 */
    addChat(state, action: PayloadAction<ChatType>) {
      state.push(action.payload);
    },
  },
});

export const { addChat } = chatDatasSlice.actions;
export default chatDatasSlice.reducer;
