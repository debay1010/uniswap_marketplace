// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 10000000 * 10 ** 18);
    }
}

contract CustomDex {
    //Custom tokens to be initialized
    string[] public tokens = ["Tether USD", "BNB", "USD Coin", "stETH", "TRON", "Matic Token", "SHIBA INU", "Uniswap" ];

    //Mapping maintain the tokens and their instances
    mapping(string => ERC20) public tokenInstanceMap;

    uint256 ethValue = 100000000000000 ;

    struct History {
        uint256 historyId;
        string tokenA;
        string tokenB;
        uint256 inputValue;  
        uint256 outputValue;
        address userAddress;
    }


    uint256 public _historyIndex;
    mapping(uint256 => History) private historys;// self- why not use History[] historys = new History(). The same index of numbers

    

    constructor() {
        for(uint256 i = 0; i < tokens.length; i++) {
            CustomToken token = new CustomToken(tokens[i], tokens[i]);  
            tokenInstanceMap[tokens[i]] = token;                
        }

        {
            // //SELF - if the tokens names and symbols are going to be different, i think we can use array of objects to replace tokens above instead:
            // string[] public myTokens = [{"name": "Tether USD", "symbol": "TUSD"}, {"name": "BNB Coin", "symbol": "BNB"}, {"name": "Matic Coin", "symbol": "MTC"}, {"name": "SHIBA INU", "symbol": "SHI"}, {"name": "USD Coin", "symbol": "USDC"}, {"name": "Uniswap Token", "symbol": "UNT"}, {"name": "TRON Coin", "symbol": "TRC"},{"name": "stETH", "symbol": "stETH"}, ]

             // for (int256 i = 0; i < myTokens.length; i++) {
             //     CustomToken myToken = new CustomToken(myTokens.name[i], myTokens.symbol[i])
             //     tokenInstanceMap[myTokens[i]] = myToken
             // }
        }        
    }
    function getBalance(string memory tokenName, address _address) public view  returns (uint256) {
        return tokenInstanceMap[tokenName].balanceOf(_address);
    }

    function getTotalSupply(string memory tokenName) public view returns (uint256) {
        return tokenInstanceMap[tokenName].totalSupply();
    }

    function getName(string memory tokenName) public view returns (string memory) {
        return tokenInstanceMap[tokenName].name();
    }

    function getTokenAddress(string memory tokenName) public view returns (address){
        return  address(tokenInstanceMap[tokenName]);
    }
      

    function getEthBalance() public view returns (uint256) { //ie balance remaining in this contract
        return address(this).balance;
    }

    function _transactionHistory(string memory tokenName, string memory etherToken, uint256 inputValue, uint256 outputValue) internal {
       
        _historyIndex++;
        uint256 _histId = _historyIndex;
        History storage history = historys[_histId];

        history.historyId = _histId;
        history.tokenA = tokenName;
        history.tokenB = etherToken;
        history.inputValue = inputValue;
        history.outputValue = outputValue;
        history.userAddress = msg.sender;
    }
    // enable user to swap the native currency of the blockchain(Platform) (eth) to any ERC20 token
    function swapEthToToken(string memory tokenName) public payable returns (uint256) {
        uint256 inputValue = msg.value;
        uint256 outputValue = (inputValue / ethValue) * 10 ** 18 ; //converts to 18 decimal places
        require(tokenInstanceMap[tokenName].transfer(msg.sender, outputValue));
        string memory etherToken = "Ether";

        _transactionHistory(tokenName, etherToken, inputValue, outputValue);
        return outputValue;
    }

    function swapTokenToEth(string memory tokenName, uint256 _amount) public returns (uint256) {
        //convert token amount to exact amount  
        uint256 exactAmount = _amount / 10 ** 18;

        uint256 ethToBeTransferred = exactAmount * ethValue;

        require(address(this).balance >= ethToBeTransferred, "The Dex is running low of funds");

        payable(msg.sender).transfer(ethToBeTransferred);
        require(tokenInstanceMap[tokenName].transferFrom(msg.sender, address(this), _amount));

        string memory etherToken = "Ether";

        _transactionHistory(tokenName, etherToken, exactAmount, ethToBeTransferred);

        return ethToBeTransferred;
    }

    function swapTokenToToken(string memory srcTokenName, string memory destTokenName, uint256 _amount) public {
        require(tokenInstanceMap[srcTokenName].transferFrom(msg.sender, address(this), _amount));

        require(tokenInstanceMap[destTokenName].transfer(msg.sender, _amount));

        _transactionHistory(srcTokenName, destTokenName, _amount, _amount);
    }

    function getAllHistory() public view returns (History[] memory) {
        uint256 itemCount = _historyIndex;
        uint256 currentIndex = 0;

        History[] memory items = new History[](itemCount);

        for (uint i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1 ;// self historys starts from 1 not 0
            History storage currentItem = historys[currentId] ;
            items[currentIndex] = currentItem;
            currentIndex +=1 ;
        }
        return items;

    }

}
