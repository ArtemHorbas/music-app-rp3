import { Button, TextField } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { useInput } from "../../hooks/useInput";
import { ITrack } from "../../types/tracks";

interface TrackPageProps {
	serverTrack: ITrack
}

const TrackPage: React.FC<TrackPageProps> = ({serverTrack}) => {

	const [track, setTrack] = React.useState(serverTrack)
	const router = useRouter()

	const username = useInput('')
	const text = useInput('')

	const addComment = async () => {
		try {
			const {data} = await axios.post('https://nest-back-music.herokuapp.com/tracks/comment', {
				username: username.value,
				text: text.value,
				trackId: track._id
			})
			setTrack({...track, comments: [...track.comments, data]})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<MainLayout title={'Track Page' + track.name + track.artist}>
			<button className="btn mb-8" onClick={() => router.push('/tracks')}>Back to the List</button>
			<div className="flex items-center space-x-24 mb-8">
				<img src={`https://nest-back-music.herokuapp.com/` + track.picture} width={290} height={290}/>
				<div className=" space-y-10">
					<h2 className="text-4xl text-gray-400">Artist - {track.artist}</h2>
					<h1 className="text-5xl">Name - {track.name}</h1>
					<h3 className="text-3xl">Listens - {track.listens}</h3>
				</div>
			</div>
			<h2 className="text-4xl text-gray-400 mb-5">Text</h2>
			<p className="text-3xl mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore fugit adipisci culpa vel eius, magnam distinctio ratione sequi tempora cum voluptates, soluta reiciendis minima officia assumenda eos, quas error. Blanditiis.</p>
			<h2 className="text-4xl text-gray-400 mb-5">Comments</h2>
			<div className="flex flex-col space-y-6 mb-6">
				<TextField
					{...username}
					label="Your Name"
					fullWidth
				/>
				<TextField
					{...text}
					label="Comment"
					fullWidth
					multiline
					rows={4}
				/>
				<Button onClick={addComment}>SEND</Button>
			</div>
			<div>
				{track.comments.map((comment, index) =>
					<div key={index}>
						<h1>Autor - {comment.username}</h1>
						<h2>Text - {comment.text}</h2>
					</div>
				)}
			</div>
		</MainLayout>
	);
}

export default TrackPage;

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async({params}) => {
	if(params){
		const {data} = await axios.get<ITrack>(`https://nest-back-music.herokuapp.com/tracks/${params.id}`)
		return {
			serverTrack: data
		}
	}
}
