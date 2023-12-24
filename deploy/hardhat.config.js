require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
//ADDED BY ME
const POLYGONSCAN_API_KEY = "5PQ9118F8TV3ZP59ECY73BSA5IT39WDYP3";

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://rpc.ankr.com/polygon_mumbai";
const NEXT_PUBLIC_PRIVATE_KEY =
	"c24027e2d0ed6dbadf8c29fea5c8cbfce76dd164ebaeef2d4b20db22a69a913a";
module.exports = {
	solidity: "0.8.5",
	defaultNetwork: "matic",
	networks: {
		hardhat: {},
		polygon_mumbai: {
			url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
			accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
		},
	},

	//added by me - worked
	// npx hardhat verify --network polygon_mumbai 0xd2524a1640e98E266025ca52b9A9ab52172FBC2C
	etherscan: {
		apiKey: {
			polygonMumbai: POLYGONSCAN_API_KEY,
		},
	},
};
