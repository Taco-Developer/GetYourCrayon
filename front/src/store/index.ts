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

import loginSlice, { LoginStateType } from './slice/loginSlice';
import userSlice, { UserStateType } from './slice/userSlice';
import navbarSlice, { NavbarStateType } from './slice/navbarSlice';
import scoreSliceReducer from './slice/game/score';
import chatDatasSliceReducer, { ChatType } from './slice/game/chatDatasSlice';
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
import userDataSliceReducer, { UserDataType } from './slice/game/userDataSlice';
import drawSliceReducer, { DrawStateType } from './slice/game/drawSlice';
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
  chatDatas: ChatType[];
  aiGameDatas: AiGameDatasType;
  isGameStarted: boolean;
  gameTheme: GameThemeType;
  userInfo: UserStateType;
  userData: UserDataType;
  draw: DrawStateType;
  isLogin: LoginStateType;
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
        chatDatas: chatDatasSliceReducer,
        isGameStarted: isGameStartedSliceReducer,
        gameTheme: gameThemeSliceReducer,
        userInfo: userSlice.reducer,
        userData: userDataSliceReducer,
        draw: drawSliceReducer,
        isLogin: loginSlice.reducer,
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
