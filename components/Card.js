import React, { useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import {
	ClipboardIcon,
	ClipboardCheckIcon,
	PlusIcon,
} from "@heroicons/react/outline";

//INTERNAL IMPORTS

import { SingleCard, TransactionStatus } from "./index";

import {
	getTokenAddress,
	getTokenBalance,
	increaseAllowance,
} from "../utils/context";

const Card = () => {
	const { address } = useAccount();

	return (
		<section className="py-6 sm:py-12 bg-[@1a1a1a] text-gray-100">
			<div className="container p-6 mx-auto space-y-8">
				<div className="space-y2">
					<h2 className="text-3xl font-bold">
						All Listed Tokens For Sale
					</h2>
					<p className="font-serif text-sm text-gray-400 ">
						Qualisque erroribus usu at, duo te agam soluta mucium
					</p>
				</div>
				<div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols2 lg:grid-cols-4">
					<SingleCard
						index={1}
						name={"Tether USD"}
						walletAddress={address}
					/>
					<SingleCard
						index={2}
						name={"BNB"}
						walletAddress={address}
					/>
					<SingleCard
						index={3}
						name={"USD Coin"}
						walletAddress={address}
					/>
					<SingleCard
						index={4}
						name={"stETH"}
						walletAddress={address}
					/>
					<SingleCard
						index={5}
						name={"TRON"}
						walletAddress={address}
					/>
					<SingleCard
						index={6}
						name={"Matic Token"}
						walletAddress={address}
					/>
					<SingleCard
						index={7}
						name={"SHIBA INU"}
						walletAddress={address}
					/>
					<SingleCard
						index={8}
						name={"Uniswap"}
						walletAddress={address}
					/>
				</div>
			</div>
		</section>
	);
};

export default Card;
