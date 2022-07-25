import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { ITrack } from '../../types/tracks'
import { IPlayerSlice } from './type'


const initialState: IPlayerSlice = {
	active: null,
	volume: 50,
	duration: 0,
	currentTime: 0,
	pause: true
}

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		pauseTrack(state)  {
			state.pause = true
		},
		playTrack(state)  {
			state.pause = false
		},
		setCurrentTime(state, action: PayloadAction<number>) {
			state.currentTime = action.payload
		},
		setVolume(state, action: PayloadAction<number>) {
			state.volume = action.payload
		},
		setDuration(state, action: PayloadAction<number>) {
			state.duration = action.payload
		},
		setActiveTrack(state, action: PayloadAction<ITrack>) {
			state.active = action.payload
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.player,
			};
		},
	}
})

export const { pauseTrack, playTrack, setCurrentTime, setVolume, setDuration, setActiveTrack } = playerSlice.actions

export default playerSlice.reducer