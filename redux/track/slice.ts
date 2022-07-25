import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { HYDRATE } from 'next-redux-wrapper'
import build from 'next/dist/build'
import { fetchTracks } from './asyncThunk'
import { ITrackSlice } from './type'


const initialState: any = {tracks: []}

export const trackSlice = createSlice({
	name: 'track',
	initialState,
	reducers: {
		setTracks(state, action){
			state.tracks = action.payload
		},
		removeTrack(state, action: PayloadAction<string>){
			state.tracks = state.tracks.filter((item: any) => item.id !== action.payload)
		},	
	},
	extraReducers: {
		[fetchTracks.pending as any]: (state) => {
			state.tracks = []
		},
		[fetchTracks.fulfilled as any]: (state, action) => {
			state.tracks = action.payload
		},
		[fetchTracks.rejected as any]: (state) => {
			state.tracks = []
		},
		[HYDRATE]: (state, action) => {
			state.tracks = action.payload.track.tracks
    }
	}	
})

export const { setTracks, removeTrack } = trackSlice.actions

export default trackSlice.reducer