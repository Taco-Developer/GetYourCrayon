import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INIT_BG_COLOR = '#FFFFFF';

export interface DrawStateType {
  canvasBgColor: string;
  paletteColor: string;
  opacityStyle: number;
  brushWidth: number;
  prevArray: ImageData[];
  nextArray: ImageData[];
}

const initialState: DrawStateType = {
  canvasBgColor: INIT_BG_COLOR,
  paletteColor: '#000000',
  brushWidth: 4,
  opacityStyle: 1,
  prevArray: [],
  nextArray: [],
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

    /** 선택된 투명도 변경 */
    changeOpacityStyle(state, action: PayloadAction<number>) {
      state.opacityStyle = action.payload;
    },

    /** 뒤로 가기 배열 추가 */
    addPrevArray(state, action: PayloadAction<ImageData>) {
      state.prevArray.push(action.payload);
    },

    /** 뒤로 가기 배열 맨 뒤 요소 제거 */
    popPrevArray(state) {
      state.prevArray.pop();
    },

    /** 되돌리기 배열 추가 */
    addNextArray(state, action: PayloadAction<ImageData>) {
      state.nextArray.push(action.payload);
    },

    /** 되돌리기 배열 맨 뒤 요소 제거 */
    popNextArray(state) {
      state.nextArray.pop();
    },
  },
});

export const {
  changeBgColor,
  changeBrushWidth,
  changeOpacityStyle,
  changePaletteColor,
  addNextArray,
  addPrevArray,
  popNextArray,
  popPrevArray,
} = drawSlice.actions;
export default drawSlice.reducer;
