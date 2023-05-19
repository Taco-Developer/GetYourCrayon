import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// # useDispatch 대용 훅 : Thunk 사용을 쉽게 해준다.
export const useAppDispatch: () => AppDispatch = useDispatch;

// # useSelector 대용 훅: useSelector 사용시 state 뒤에 붙여야 하는 RootState를 안붙여도 된다.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
