import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } from '../redux/player/slice'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { ITrack } from '../types/tracks';
import { TrackProgress } from './TrackProgress';
import Image from "next/image";

let audio: any;

export const Player: React.FC = () => {

	
	const dispatch = useAppDispatch()
	const {active, pause,  volume, duration, currentTime} = useAppSelector(state => state.player)

	React.useEffect(() => {
		if(!audio){
			audio = new Audio()
		}else {
			setAudio()
		}
	}, [active])

	const setAudio = () => {
		if(active){
			audio.src = 'https://nest-back-music.herokuapp.com/' + active.audio
			audio.volume = volume / 100
			audio.onloadedmetadata = () => {
				dispatch(setDuration(Math.ceil(audio.duration)))
			}
			audio.ontimeupdate = () => {
				dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
			}
			audio.play()
		}
	}

	const play = () => {
		if(pause){
			dispatch(playTrack())
			audio.play()
		}else{
			dispatch(pauseTrack())
			audio.pause()
		}
	}

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		audio.volume = Number(e.target.value) / 100;
		dispatch(setVolume(Number(e.target.value)))
	}

	const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		audio.currentTime = Number(e.target.value)
		dispatch(setCurrentTime(Number(e.target.value)))
	}

	if(!active){
		return null
	}

	return (
		<div className=' w-full h-16 fixed bottom-0 flex items-center justify-between px-4 py-2 bg-gray-500'>
			<div className='flex items-center space-x-20'>
				<IconButton onClick={play}>
					{!pause ? <Pause /> : <PlayArrow />}
				</IconButton>
				<img src={`https://nest-back-music.herokuapp.com/` + active.picture} width={50} height={50}  alt="" />
				<div className="flex flex-col space-y-6">
						<h3>{active.name}</h3>
						<h4>{active.artist}</h4>
				</div>
			</div>
			<TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
			<div className='flex items-center space-x-2'>
				<VolumeUp />
				<TrackProgress left={volume} right={100} onChange={changeVolume}/>
			</div>
		</div>
	)
}
