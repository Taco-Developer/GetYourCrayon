import {
  configureStore,
  Reducer,
  AnyAction,
  ThunkAction,
  Action,
  CombinedState,
  combineReducers,
} from '@reduxjs/toolkit';

import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import mypageSlice, { MypageStateType } from './slice/mypageSlice';
import loginSlice, { LoginStateType } from './slice/loginSlice';
import userSlice, { UserStateType } from './slice/userSlice';
import navbarSlice, { NavbarStateType } from './slice/navbarSlice';
import scoreSliceReducer from './slice/game/score';
import inGameChatDatasSliceReducer, {
  InGameChatDataType,
} from './slice/game/inGameChatDatasSlice';
import gameRoundSliceReducer, {
  GameRoundType,
} from './slice/game/gameRoundSlice';
import gameUsersSliceReducer, { GameUser } from './slice/game/gameUsersSlice';
import leftTimeSliceReducer from './slice/game/leftTimeSlice';
import aiGameDatasSliceReducer, {
  AiGameDatasType,
} from './slice/game/aiGameDatasSlice';
import isGameStartedSliceReducer from './slice/game/isGameStartedSlice';
import gameThemeSliceReducer, {
  GameThemeType,
} from './slice/game/gameThemeSlice';
import drawSliceReducer, { DrawStateType } from './slice/game/drawSlice';
import answersSliceReducer, { AnswersType } from './slice/game/answersSlice';
import gameRoomSlice, { RoomIdxtype } from './slice/game/gameRoom';
import gameModeSliceReducer from './slice/game/gameModeSlice';
import userRoleSliceReducer from './slice/game/userRoleSlice';
// import { persistReducer, persistStore } from 'redux-persist';
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

export interface ReducerStates {
  navbarPath: NavbarStateType;
  score: number;
  leftTime: number;
  gameUsers: GameUser[];
  gameRound: GameRoundType;
  inGameChatDatas: InGameChatDataType[];
  aiGameDatas: AiGameDatasType;
  isGameStarted: boolean;
  gameTheme: GameThemeType;
  userInfo: UserStateType;
  userRole: string;
  draw: DrawStateType;
  isLogin: LoginStateType;
  mypageInfo: MypageStateType;
  answers: AnswersType;
  roomIdx: RoomIdxtype;
  gameMode: string;
}

//HYDRATE 액션을 정의 -> 슬라이스 통함
const rootReducer = (
  state: ReducerStates,
  action: AnyAction,
): CombinedState<ReducerStates> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        navbarPath: navbarSlice.reducer,
        aiGameDatas: aiGameDatasSliceReducer,
        score: scoreSliceReducer,
        leftTime: leftTimeSliceReducer,
        gameUsers: gameUsersSliceReducer,
        gameRound: gameRoundSliceReducer,
        inGameChatDatas: inGameChatDatasSliceReducer,
        isGameStarted: isGameStartedSliceReducer,
        gameTheme: gameThemeSliceReducer,
        userInfo: userSlice.reducer,
        userRole: userRoleSliceReducer,
        draw: drawSliceReducer,
        isLogin: loginSlice.reducer,
        mypageInfo: mypageSlice.reducer,
        answers: answersSliceReducer,
        roomIdx: gameRoomSlice.reducer,
        gameMode: gameModeSliceReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<ReducerStates, AnyAction>,
    devTools: process.env.NODE_ENV === 'development',
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
