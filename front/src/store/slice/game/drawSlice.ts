import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INIT_BG_COLOR = '#FFFFFF';

export interface DrawStateType {
  INIT_BG_COLOR: string;
  canvasBgColor: string;
  paletteColor: string;
  brushWidth: number;
  selectedTool: string;
}

const initialState: DrawStateType = {
  INIT_BG_COLOR: INIT_BG_COLOR,
  canvasBgColor: INIT_BG_COLOR,
  selectedTool: 'brush',
  paletteColor: '#000000',
  brushWidth: 4,
};

const drawSlice = createSlice({
  name: 'drawSetting',
  initialState,
  reducers: {
    /** 캔버스 배경색 변경 */
    changeBgColor(state, action: PayloadAction<string>) {
      state.canvasBgColor = action.payload;
    },

    /** 선택된 색 변경 */
    changePaletteColor(state, action: PayloadAction<string>) {
      state.paletteColor = action.payload;
    },

    /** 선택된 붓 너비 변경 */
    changeBrushWidth(state, action: PayloadAction<number>) {
      state.brushWidth = action.payload;
    },

    /** 선택된 도구 변경 */
    changeSelectedTool(state, action: PayloadAction<string>) {
      state.selectedTool = action.payload;
    },
  },
});

export const {
  changeBgColor,
  changeBrushWidth,
  changePaletteColor,
  changeSelectedTool,
} = drawSlice.actions;
export default drawSlice.reducer;
