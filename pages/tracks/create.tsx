import { FileUploadRounded } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { FileUpload } from "../../components/FileUpload";
import MainLayout from "../../components/layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {useInput} from "../../hooks/useInput";

const Create: FC = () => {

	const [activeStep, setActiveStep] = React.useState(0)

	const router = useRouter()


	const [image, setImage] = React.useState(null)
	const [audio, setAudio] = React.useState(null)

	const name = useInput('')
	const artist = useInput('')
	const text = useInput('')

	const next = () => {
		if(activeStep !== 2){
			setActiveStep(prev => prev + 1)
		}else{
			const formData = new FormData()
			formData.append('name', name.value)
			formData.append('artist', artist.value)
			formData.append('text', text.value)
			//@ts-ignore
			formData.append('audio', audio)
			//@ts-ignore
			formData.append('image', image)
			axios.post('https://nest-back-music.herokuapp.com/tracks', formData)
				.then(resp => router.push('/tracks'))
				.catch(err => console.log(err))
		}
	}

	const back = () => {
		if(activeStep !== 0){
			setActiveStep(prev => prev - 1)
		}else{
			router.push('/tracks')
		}
	}

	return (
		<MainLayout title={'Create the track'}>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 &&
				<div className="flex flex-col space-y-10">
					<TextField
						{...name}
						label='Track Name'
					/>
					<TextField
						{...artist}
						label='Artist Name'
					/>
					<TextField
						{...text}
						label='Track Text'
						multiline
						rows={3}
					/>
				</div>
				}
				{activeStep === 1 &&
					<FileUpload setFile={setImage} accept="image/*">
						<Button>{image ? <>Successfuly added</> : <>Upload track Image</>}</Button>
					</FileUpload>
				}
				{activeStep === 2 &&
					<FileUpload setFile={setAudio} accept="audio/*">
						<Button>{audio ? <>Successfuly added</> : <>Upload track Audio</>}</Button>
					</FileUpload>
				}
			</StepWrapper>
			<div className="flex justify-between">
				<button onClick={back} className="btn">{activeStep === 0 ? <>Turn Back</> : <>Prev</>}</button>
				<button onClick={next} className="btn">{activeStep === 2 ? <>Finish</> : <>Next</>}</button>
			</div>
		</MainLayout>
	);
}

export default Create;
