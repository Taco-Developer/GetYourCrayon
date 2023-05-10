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
import navbarSlice, { NavbarStateType } from './slice/navbarSlice';
import inGameSliceReducer, { InGameStateType } from './slice/inGameSlice';
import scoreSliceReducer from './slice/game/score';
import chatDatasSliceReducer, { ChatType } from './slice/game/chatDatasSlice';
import gameModalSliceReducer, {
  GameModalStatusType,
} from './slice/game/gameModalSlice';
import gameRoundSliceReducer, {
  GameRoundType,
} from './slice/game/gameRoundSlice';
import gameThemeSliceReducer from './slice/game/gameThemeSlice';
import gameUsersSliceReducer, { GameUser } from './slice/game/gameUsersSlice';
import leftTimeSliceReducer from './slice/game/leftTimeSlice';
import aiGameDatasSliceReducer, {
  AiGameDatasType,
} from './slice/game/aiGameDatasSlice';
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
  inGame: InGameStateType;
  score: number;
  leftTime: number;
  gameUsers: GameUser[];
  gameTheme: string;
  gameRound: GameRoundType;
  gameModalStatus: GameModalStatusType;
  chatDatas: ChatType[];
  aiGameDatas: AiGameDatasType;
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
        inGame: inGameSliceReducer,
        score: scoreSliceReducer,
        leftTime: leftTimeSliceReducer,
        gameUsers: gameUsersSliceReducer,
        gameTheme: gameThemeSliceReducer,
        gameRound: gameRoundSliceReducer,
        gameModalStatus: gameModalSliceReducer,
        chatDatas: chatDatasSliceReducer,
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

export const { setNavbarPath } = navbarSlice.actions;
