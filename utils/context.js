import { BigNumber, ethers } from "ethers";
import { contract, tokenContract } from "./contract";
// import { toEth, toWei } from "./utils";
import { toEth } from "./utils";

export async function swapEthToToken(tokenName, amount) {
	try {
		let tx = { value: toWei(amount) };
		const contractObj = await contract();
		const data = await contractObj.swapEthToToken(tokenName, tx); //calling fxn from solidity

		const receipt = await data.wait();
		return receipt;
	} catch (e) {
		return parseErrorMsg(e);
	}
}

export async function hasValidAllowance(owner, tokenName, amount) {
	try {
		const contractObj = await contract();
		const address = await contractObj.getTokenAddress(tokenName);

		const tokenContractObj = await tokenContract(address);
		const data = await tokenContractObj.allowance(
			owner,
			"0xd2524a1640e98E266025ca52b9A9ab52172FBC2C"
		);

		console.log(data);

		const result = BigNumber.from(data.toString()).gte(
			BigNumber.from(toWei(amount))
		);

		return result;
	} catch (err) {
		return parseErrorMsg(err);
	}
}

export async function swapTokenToEth(tokenName, amount) {
	try {
		const contractObj = await contract();
		const data = await contractObj.swapTokenToEth(tokenName, toWei(amount));

		const receipt = await data.wait();
		return receipt;
	} catch (error) {
		return parseErrorMsg(error);
	}
}

export async function swapTokenToToken(srcToken, destToken, amount) {
	try {
		const contractObj = await contract();
		const data = await contractObj.swapTokenToToken(
			srcToken,
			destToken,
			toWei(amount)
		);
		const receipt = await data.wait();
		return receipt;
	} catch (error) {
		return parseErrorMsg(error);
	}
}
//Self: the address here could be the address of the person calling the function msg.sender
export async function getTokenBalance(tokenName, address) {
	const contractObj = await contract();
	// console.log(contractObj);
	const balance = await contractObj.getBalance(tokenName, address);
	// console.log(balance);
	return balance;
}

export async function getTokenAddress(tokenName) {
	try {
		const contractObj = await contract();
		const address = await contractObj.getTokenAddress(tokenName);
		return address;
	} catch (error) {
		return parseErrorMsg(error);
	}
}

export async function increaseAllowance(tokenName, amount) {
	try {
		const contractObj = await contract();
		const address = await contractObj.getTokenAddress(tokenName);

		const tokenContractObj = await tokenContract(address);
		const data = await tokenContractObj.approve(
			"0xd2524a1640e98E266025ca52b9A9ab52172FBC2C",
			toWei(amount)
		);

		const receipt = await data.wait();
		return receipt;
	} catch (error) {
		return parseErrorMsg(error);
	}
}

export async function getAllHistory() {
	try {
		const contractObj = await contract();
		const getAllHistory = contractObj.getAllHistory();
		console.log(getAllHistory);

		const historyTransaction = getAllHistory.map((history, i) => ({
			historyId: history.historyId.toNumber(),
			tokenA: history.tokenA,
			tokenB: history.tokenB,
			// inputValue: toEth(history?.inputValue),
			// outputValue: toEth(history?.outputValue),
			inputValue: toEth(history.inputValue),
			outputValue: toEth(history.outputValue),
			userAddress: history.userAddress,
		}));

		console.log(historyTransaction);
		return historyTransaction;
	} catch (error) {
		parseErrorMsg(error);
	}
}

// function toWei(amount) {
// 	const toWei = ethers.utils.parseUnits(amount.toString());
// 	return toWei.toString();
// }

function parseErrorMsg(e) {
	const json = JSON.parse(JSON.stringify(e));
	return json?.reason || json?.error?.message;
}
