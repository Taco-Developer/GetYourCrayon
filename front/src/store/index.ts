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
      });
      return combinedReducer(state, action);
    }
  }
};
