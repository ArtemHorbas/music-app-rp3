import { Button } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import MainLayout from "../../components/layouts/MainLayout";
import { TrackItem } from "../../components/TrackItem";
import { NextThunkDispatch, useAppDispatch, useAppSelector, wrapper } from "../../redux/store";
import { ITrack } from "../../types/tracks";
import { fetchTracks } from "../../redux/track/asyncThunk";

const Tracks = () => {

	const router = useRouter()
	const {tracks} = useAppSelector(state => state.track)


	return (
		<MainLayout title={'Track List'}>
				<div className="track-heading flex justify-between items-center pb-8">
					<h1 className=" text-5xl">TRACK LIST</h1>
					<button className="btn" onClick={() => router.push('/tracks/create')}>UPLOAD</button>
				</div>
				<div className="track-items flex flex-col space-y-9">
					{tracks.map((track: any) => (
						<TrackItem track={track} key={track._id} />
					))}
				</div>
		</MainLayout>
	);
}


export const getStaticProps = wrapper.getStaticProps(store => async(ctx) => {
	
	const dispatch = store.dispatch as NextThunkDispatch
	await dispatch(fetchTracks())
	
	return {props: {}}
})



export default Tracks;


