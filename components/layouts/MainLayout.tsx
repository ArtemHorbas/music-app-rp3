
import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import Navbar from "../Navbar";
import { Player } from "../Player";

interface MainLayoutProps {
	children: React.ReactNode
	title?: string
	description?: string
	keywords?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={'Musicial platform, where everyone is able to find smth for himself' + description} />
				<meta name="robots" content="index, follow" />
				<meta name="keywords" content={keywords || 'Music, tracks, artists, trends'} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
		
			<Navbar />
			<main>
				<div className="my__container">
					{children}
				</div>
			</main>
			<Player />
		</>
	);
}

export default MainLayout;