import React from "react";

//INTERNAL IMPORTS
import { Header, HeroSection, Footer, Card } from "../components/index";

const home = () => {
	return (
		<div className="bg-[#1A1A1A]">
			<Header />
			<HeroSection />
			<Card />
			<Footer />
		</div>
	);
};

export default home;
