import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import Image from "next/image"
import React, { FC } from 'react'
import { ITrack } from '../types/tracks'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { playTrack, setActiveTrack } from '../redux/player/slice'
import axios from 'axios'
import { removeTrack } from '../redux/track/slice'

interface TrackItemProps {
	track: ITrack
}

export const TrackItem: FC<TrackItemProps> = ({track}) => {

	const dispatch = useAppDispatch()
	const router = useRouter()

	const {active, pause, duration, currentTime} = useAppSelector(state => state.player)

	const play = (e: any) => {
		e.stopPropagation()
		dispatch(setActiveTrack(track))
		dispatch(playTrack())
	}

	const remove = async (e: any) => {
		e.stopPropagation()
		await axios.delete(`https://nest-back-music.herokuapp.com/tracks/${track._id}`)
		dispatch(removeTrack(track._id))
	}

	
	return (
		<div className="track-item px-9 py-5 flex justify-between items-center" onClick={() => router.push(`/tracks/${track._id}`)} >
			<div className="flex space-x-6">
				<IconButton onClick={play}>
					{!pause ? <Pause /> : <PlayArrow />}
				</IconButton>
				<img src={`https://nest-back-music.herokuapp.com/` + track.picture} width={70} height={70} />
				<div className="flex flex-col space-y-6">
					<h3>{track.name}</h3>
					<h4>{track.artist}</h4>
				</div>
			</div>
			<div className='flex items-center space-x-5'>
				{!pause && <p>{currentTime} / {duration}</p>}
				<IconButton onClick={remove}>
					<Delete />
				</IconButton>
			</div> 
		</div>
	)
}
