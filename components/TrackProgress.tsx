import React from 'react'

interface TrackProgressProps {
	left: number
	right: number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {
	return (
		<div className='flex space-x-6'>
			<input 
				type="range" 
				min={0}
				max={right}
				value={left}
				onChange={onChange}
			/>
			<div>{left} / {right}</div>
		</div>
	)
}
