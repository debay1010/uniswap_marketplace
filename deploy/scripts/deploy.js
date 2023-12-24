const hre = require("hardhat");
// const { ethers } = require("hardhat");

async function main() {
	// const CustomDex = await ethers.getContractFactory("CustomDex");
	const CustomDex = await hre.ethers.getContractFactory("CustomDex");
	const customDex = await CustomDex.deploy();

	await customDex.deployed();
	console.log(`CustomDex: ${customDex.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

//polygonscan api =  5PQ9118F8TV3ZP59ECY73BSA5IT39WDYP3

//work fine
// npx hardhat run scripts/deploy.js --network polygon_mumbai

// CustomDex: 0x77923F2AEf54A4f42D6a96DD616a161AA2dC9Cc0    -old- no more use

//CustomDex: 0x5E442a52712F35236bA9ec1Aa88E360Dea77f59F     -  old 21/12 9:09

// CustomDex: 0xd2524a1640e98E266025ca52b9A9ab52172FBC2C   -latest 24/12/23 12:22pm
