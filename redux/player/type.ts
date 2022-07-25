import { ITrack } from "../../types/tracks";

export interface IPlayerSlice {
	active: null | ITrack
	volume: number
	duration: number
	currentTime: number
	pause: boolean
}
