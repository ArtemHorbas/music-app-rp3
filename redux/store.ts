import { Action, AnyAction, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import player from './player/slice';
import track from './track/slice';

export function makeStore() {
	return configureStore({
		reducer: {
			player,
			track
		}
	})
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const wrapper = createWrapper<RootStore>(makeStore);
