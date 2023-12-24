import { ethers } from "ethers";
import CustomDexABI from "../utils/CustomDex.json";
import CustomTokenABI from "../utils/CustomToken.json";

export const tokenContract = async (address) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const { ethereum } = window;

	if (ethereum) {
		const signer = provider.getSigner();
		console.log(signer);
		const contractReader = new ethers.Contract(
			address,
			CustomTokenABI.abi,
			signer
		);

		return contractReader;
	}
};

export const contract = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const { ethereum } = window;

	if (ethereum) {
		const signer = provider.getSigner();
		//
		const contractReader = new ethers.Contract(
			"0xd2524a1640e98E266025ca52b9A9ab52172FBC2C",
			CustomDexABI.abi,
			signer
		);
		return contractReader;
	}
};
