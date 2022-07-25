import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITrack } from "../../types/tracks";

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async () => {
	const {data} = await axios.get(
		'https://nest-back-music.herokuapp.com/tracks'
	)

	return data
})